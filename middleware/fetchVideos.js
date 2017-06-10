var AWS = require('aws-sdk');
var S3config = require('../S3config.js');

module.exports = (callback) => new Promise((resolve, reject) => {

  var s3 = new AWS.S3();

  var params = {
    Bucket: S3config.bucket,
    Prefix: S3config.thumbnailpath+S3config.thumbnailprefix
  };
  let videos = [];
  s3.listObjectsV2(params, function (err, objects) {
    if (err) reject(err); // an error occurred
    else {
      objects.Contents.forEach(it => {
        s3.getObjectTagging({Bucket: params.Bucket, Key: it.Key}, function (err, objtags) {
          if (err) {
            reject(err); // an error occurred
          }
          else {
            videos.push({key: it.Key, awstags:objtags.TagSet })
            if(videos.length == objects.Contents.length){
              resolve(videos); 
            }
          }
        });
      })
    }
  })
}
)