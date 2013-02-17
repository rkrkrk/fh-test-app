function appInit() {
    console.log("App Has Started");
    $('.refreshButton').removeClass('disabled');
    getTweets();

    $('.refreshButton').on('click',function(){
        if($(this).hasClass('disabled')) {
            return;
        }
        getTweets();
    });
}

function appOffline() {
    $('.content').empty().append("<h2>The App appears to be offline</h2>");
}

function getTweets() {
    $('.refreshButton').addClass('disabled');
    $fh.act({
        act: "getInfo",
        req: {query: '@feedhenry'}
    }, function(res) {
        console.log(res);
        displayList(res.result);
        $('.refreshButton').removeClass('disabled');
    }, function(err, res,test) {
        console.log("failage",err,res);
        $('.refreshButton').removeClass('disabled');
    });
}

function displayList(listitem) {
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    $('.content').empty().append(template({listitem:listitem})).hide().slideDown('slow');
}

function onConnectionChange() {
    Utils.isOnline(function(online){
        if(online) {
            $('.refreshButton').removeClass('disabled');
            getTweets();
        } else {
            $('.refreshButton').addClass('disabled');
            appOffline();
        }
    });
}
