const AWS = require('aws-sdk');
const fs = require('fs');

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

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Users",
  KeySchema: [
    { AttributeName: "group", KeyType: "HASH" },  //Partition key
    { AttributeName: "email", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "group", AttributeType: "S" },
    { AttributeName: "email", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});