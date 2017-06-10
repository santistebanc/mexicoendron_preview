const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const DynamoDBStore = require('dynamodb-session-store')(session);
const next = require('next')
const fetchVideos = require('./middleware/fetchVideos.js')
const processVideos = require('./middleware/processVideos.js')
const S3config = require('./S3config.js');
const fs = require('fs');
const AWS = require('aws-sdk');

const dev = process.env.NODE_ENV !== 'production'

//configure AWS SDK

const filepath = '../awskeys.json';
let aws_aki = process.env.AWS_ACCESS_KEY_ID
let aws_sak = process.env.AWS_SECRET_ACCESS_KEY
if (fs.existsSync(filepath)) {
  var keys = JSON.parse(fs.readFileSync('../awskeys.json', 'utf8'));
  aws_aki = keys.accessKeyId
  aws_sak = keys.secretAccessKey
  AWS.config.update({
    accessKeyId: aws_aki,
    secretAccessKey: aws_sak,
    region: 'us-west-1'
  })
}

//fetch videos

let videosData = {}
let fetchedalready = false;

const getVideos = () => new Promise((resolve, reject) => {
  console.log('fetching videos from Amazon S3')
  fetchedalready = true;
  fetchVideos().then((videos) => {
    processVideos(videos).then((results) => {
      videosData = results
      console.log('videos loaded successfully')
      resolve(results);
    });
  })
})

getVideos();

//--------------------------


//init

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {

    const server = express()

    require('./passport.js')(passport, AWS);

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(session({
      secret: S3config.secret,
      resave: false,
      saveUninitialized: false
    }))
    server.use(passport.initialize())
    server.use(passport.session())
    server.use(flash());

    //router---------------------

    server.post('/registrar', passport.authenticate('local-signup', {
      successRedirect: '/', // redirect to the secure profile section
      failureRedirect: '/registrar', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }));

    server.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/registrar', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    server.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
    });

    server.get('/reload', (req, res) => {
      fetchedalready = false;
      res.redirect('/');
    })

    server.get(['/', '/video/:id', '/registrar'], (req, res, next) => {
      if (!fetchedalready) {
        getVideos().then((results) => {
          res.videos = results.videos;
          res.tags = results.tags;
          res.stems = results.stems;
        })
      } else {
        res.videos = videosData.videos;
        res.tags = videosData.tags;
        res.stems = videosData.stems;
      }
      next()
    })

    server.get('/registrar', (req, res) => {
      return app.render(req, res, '/registrar', req.query)
    })

    server.get('/video/:id', (req, res) => {
      return app.render(req, res, '/video', req.params)
    })

    server.get('/', (req, res) => {
      return app.render(req, res, '/', req.query)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
