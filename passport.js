var LocalStrategy = require('passport-local').Strategy;
const Database = require('./dynamoDB.js');
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt-nodejs');

const generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = function (object, subject) {
  return bcrypt.compareSync(object, subject);
};

module.exports = function (passport, AWS) {

  passport.serializeUser(function (user, done) {
    console.log("serializing", user.email)
    done(null, user.email);
  });

  // used to deserialize the user
  passport.deserializeUser(function (email, done) {
    console.log("deserializing", email)
    Database.get('Users', { group: 'regular', email: email }).then((data) => {
      done(null, data.Item);
    }).catch((err) => done(err))
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        Database.get('Users', { group: 'regular', email: email }).then((data) => {
          if (data.Item) {
            done(null, false, req.flash('signupMessage', 'That email is already taken.'))
          } else {
            const newUser = { group: 'regular', email: email, password: generateHash(password), dateCreated: Date.now() }
            Database.put('Users', newUser).then((data) => {
              done(null, newUser);
            }).catch((err) => done(err))
          }
        }).catch((err) => done(err))
      })
    }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      Database.get('Users', { group: 'regular', email: email }).then((data) => {
        if (!data.Item) {
          done(null, false, req.flash('loginMessage', 'No user found.'));
        } else if (!validPassword(password, data.Item.password)) {
          done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        } else {
          done(null, data.Item);
        }
      }).catch((err) => done(err))
    }));

}