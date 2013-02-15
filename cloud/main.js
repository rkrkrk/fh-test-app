//Sample getInfo method that queries Twitter's feed
module.exports.getInfo = function(args, callback){
    // default the tag to 'cats' if there's none set
    var query = args.query ? args.query : "cats";
    //make the call to
    $fh.web({
      url: "http://search.twitter.com/search.json?q="+query+"&callback=?",
      method: "GET",
      contentType: 'text/json',
      timeout: 10000
    },function(err,data){
      if(err) {
        //there was an error, so return that!
        return callback("there's an error!");
      }
      var body = data.body;
      return callback(null,body);
    });
};