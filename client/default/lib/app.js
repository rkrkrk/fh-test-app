function appInit() {
    console.log("App Has Started");
    $fh.act({
        act: "getInfo",
        req: {query: '@feedhenry'}
    }, function(res) {
        displayTweets(res.results);
    }, function(err, res,test) {
        console.log("failage",err,res);
    });
}

function appOffline() {
    $('.testing').empty().append("<h2>The App appears to be offline</h2>");
}

function displayTweets(tweetlist) {
    console.log("Showing",tweetlist);
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    $('.testing').empty().append(template({tweetlist:tweetlist}));
}


function onConnectionChange() {
    Utils.isOnline(function(online){
        if(online) {
            appInit();
        } else {
            appOffline();
        }
    });
}
