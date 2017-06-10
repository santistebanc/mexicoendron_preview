const AWS = require('aws-sdk');
// const fs = require('fs');

// const filepath = '../awskeys.json';
// let aws_aki = process.env.AWS_ACCESS_KEY_ID
// let aws_sak = process.env.AWS_SECRET_ACCESS_KEY
// if (fs.existsSync(filepath)) {
//   var keys = JSON.parse(fs.readFileSync('../awskeys.json', 'utf8'));
//   aws_aki = keys.accessKeyId
//   aws_sak = keys.secretAccessKey
//   AWS.config.update({
//     accessKeyId: aws_aki,
//     secretAccessKey: aws_sak,
//     region: 'us-west-1'
//   })
// }

module.exports.get = (table, key) => new Promise((resolve, reject) => {

  var docClient = new AWS.DynamoDB.DocumentClient()

  var params = {
    TableName: table,
    Key: key
  };

  docClient.get(params, function (err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      reject(err)
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      resolve(data)
    }
  })
})

module.exports.put = (table, item) => new Promise((resolve, reject) => {

  var docClient = new AWS.DynamoDB.DocumentClient()

  var params = {
    TableName: table,
    Item: item
  };

  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      reject(err)
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      resolve(data)
    }
  })
})