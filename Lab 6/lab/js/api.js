
var fourClient = [
    "https://api.foursquare.com/v2/venues/search?",
    "client_id=KDK3UGDYCKBAKNC3VBSZO1TNRGMZ24F1JT1M2KFG5LWKZ5JS",
    "client_secret=YZRUJJVFH1TQJKXPBQ4KNMNL1BNRBEFXCCBUEQHIK0CKX1K2",
    "v=20181005",
    "limit=3",
    "query=restaurant",
];

var getInfo = function() {
    let req = {};
    $.each($("#myForm").serializeArray(), function(i, field) {
        req[field.name] = field.value;
    });

    return req
};

var formSubmit = function() {
    var req = getInfo();

    var fourClientSearchTerms = "near=" + req.city + "," + req.state;
    var fourParams = fourClient.concat([fourClientSearchTerms]).join("&");

    console.log(fourParams)
    $.ajax( fourParams )
        .done(function(data) {
            var venues = [];
            $(data.response.venues).each(function() {
                $("#fourSquareData").append;
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