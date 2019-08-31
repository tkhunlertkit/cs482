var fourClientBase = "https://api.foursquare.com/v2/venues/search?";
var fourClientID = "KDK3UGDYCKBAKNC3VBSZO1TNRGMZ24F1JT1M2KFG5LWKZ5JS";
var fourClientSecret = "YZRUJJVFH1TQJKXPBQ4KNMNL1BNRBEFXCCBUEQHIK0CKX1K2";
var fourClientversion = "20181005";
var fourClientLimit = "3";
var fourClientQuery = "restaurant";

var getInfo = function() {
    let req = {};
    $.each($("#myForm").serializeArray(), function(i, field) {
        req[field.name] = field.value;
    });

    return req
};

var formSubmit = function() {
    var req = getInfo();

    var fourClientSearchTerms = req.city + "," + req.state;

    $.ajax({
        url: fourClientBase,
        data: {
            "client_id": fourClientID,
            "client_secret": fourClientSecret,
            "v": fourClientversion,
            "limit": fourClientLimit,
            "query": fourClientQuery,
            "near": fourClientSearchTerms,
        },
        cache: false,
        type: "GET",
    })
        .done(function(data) {
            $("#fourSquareData ul").text("");
            var venues = [];
            $(data.response.venues).each(function() {
                $("#fourSquareData ul").append($("<li></li>").text(this.name));
            });
            console.log(data.response.venues);
        })
        .fail(function(error) {
            console.log(error);
        });
};

$(document).ready(function() {
    $("#myForm").submit(function() {formSubmit()});
});