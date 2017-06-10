const natural = require('dbrans-natural');
var S3config = require('../S3config.js');
var shorthash = require("shorthash");

module.exports = (videosData) => new Promise((resolve, reject) => {
  let videos = [];
  videosData.forEach(vid => {
    const filename = vid.key.substring(S3config.thumbnailpath.length);
    const unprefixedfilename = vid.key.substring((S3config.thumbnailpath+S3config.thumbnailprefix).length);
    const shortname = unprefixedfilename.replace(/\.[^/.]+$/, "");
    const thumbpath = S3config.videopathstart+S3config.thumbnailpath+filename;
    const fullpath = S3config.videopathstart+S3config.fullpath+S3config.fullprefix+unprefixedfilename;
    const posterpath = S3config.videopathstart+S3config.posterpath+S3config.posterprefix+shortname+".png";
    const id = shorthash.unique(shortname);
    let resultvideo = {key: vid.key, filename, unprefixedfilename, thumbpath, fullpath, shortname, posterpath, id};
    vid.awstags.forEach(it=>{
      if(it.Key == "tags"){
        resultvideo[it.Key] = it.Value.split(" ");
      }else{
        resultvideo[it.Key] = it.Value;
      }
    })
    videos.push(resultvideo);
  })
  const smtgs = stemTags(videos);
  const results = {videos: videos, tags: smtgs.tags, stems: smtgs.stems};
  resolve(results);
})

const stemTags = function (videos) {
  let tags = {};
  let stems = {};
  videos.forEach(vid => {
    vid.tags && vid.tags.forEach(tag => {
      const stem = natural.PorterStemmerEs.stem(tag);
      if (tags[tag] == undefined) {
        tags[tag] = [vid.key];
      } else {
        tags[tag].push(vid.key);
      }
      if (stems[stem] == undefined) {
        stems[stem] = [vid.key];
      } else {
        stems[stem].push(vid.key);
      }
    })
  })
  return {tags, stems};
}