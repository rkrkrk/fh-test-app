var async = require('async');
var xml2js = require('xml2js');


//Sample getInfo method that queries Twitter's feed
exports.getInfo = function(args, callback){
    console.log("ub getInfo");
    // run getTweets and getPicasaImgs in parallel
    async.parallel([
      getTweets,
      //getPicasaImgs
    ], function(err,results) {
        var array1 = [], array2 = [], response = {};
        for (var i = 0; i < results.length; i++) {
            result = results[i];
            if(result.results) {
                response.tweets = result;
                array1 = result.results;
                continue;
            }
            if(result.entry) {
                response.picassa = result;
                array2 = result.entry;
                continue;
            }
        }
        response.result = array1.concat(array2).sort(dateSort);

        return callback(null,response);
    });
};


function getPicasaImgs(callback) {
    var args = {};
    args.query = "feedhenry";
    $fh.web({
      url: "https://picasaweb.google.com/data/feed/api/all?q="+args.query+"&max-results=15",
      method: "GET",
      contentType: 'text/xml',
      timeout: 10000
    },function(err,data){
      if(err) {
        //there was an error, so return that!
        return callback("there's an error!");
      }
      var body = data.body;
      //parse the xmlresponse and turn to JS object
      var parser = new xml2js.Parser({mergeAttrs:true,explicitArray:false});
      //when parser is finished, return
      parser.on('end', function(result) {
            return callback(null,result);
      });
      if(body === undefined) {
        callback("error","an unknown error has occured");
      }
      parser.parseString(body);
    });
}

function getTweets(callback) {
    var args = {};
    args.query = "feedhenry";
    $fh.web({
      url: "http://search.twitter.com/search.json?q="+args.query+"&callback=?",
      method: "GET",
      contentType: 'application/json',
      timeout: 10000
    },function(err,data){
      if(err) {
        //there was an error, so return that!
        return callback("there's an error!");
      }
      var body = data.body;
      return callback(null,eval("(" + body + ")"));
    });
}

function dateSort(a, b){
    var timeA, timeB;
    if(a.created_at) {
        timeA = new Date(a.created_at);
    } else if (a['gphoto:timestamp']) {
        timeA = new Date(a['gphoto:timestamp']);
    }
    if(b.created_at) {
        timeB = new Date(b.created_at);
    } else if (b['gphoto:timestamp']) {
        timeB = new Date(b['gphoto:timestamp']);
    }

    return (timeA - timeB);
}
