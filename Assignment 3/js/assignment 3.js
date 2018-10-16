// four square info.
var fourUrl = "https://api.foursquare.com/v2/venues/search";
var fourVenueUrl = "https://api.foursquare.com/v2/venues/"
var fourClientID = "KDK3UGDYCKBAKNC3VBSZO1TNRGMZ24F1JT1M2KFG5LWKZ5JS";
var fourSecret = "YZRUJJVFH1TQJKXPBQ4KNMNL1BNRBEFXCCBUEQHIK0CKX1K2";
var fourVersion = "20181005";
var fourQuery = "restaurant";

// open weather info
var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var openWeatherAPPID = "661adeba794b874ebe3c0ff889a608d7";


// Form submission logic
var formSubmit = function () {
    var req = getInfo();


    let $openWeatherInfo = $("#openWeatherInfo");
    let $fourData = $("#fourSquareRestaurants");
    let ajaxDone = false;

    $fourData.hide();
    $openWeatherInfo.hide();

    // Open Weather ajax Call
    $.ajax({
        url: openWeatherUrl,
        data: {
            "APPID": openWeatherAPPID,
            "q": req.city + "," + req.state,
        },
        crossDomain: true,
        dataType: 'jsonp',
    })
        .done(function (data) {
            $openWeatherInfo.text("");
            $openWeatherInfo.append($("<li></li>").text("Temperature (highest): " + convertToFahrenheit(data.main.temp_max)));
            $openWeatherInfo.append($("<li></li>").text("Temperature (now): " + convertToFahrenheit(data.main.temp)));
            $openWeatherInfo.append($("<li></li>").text("Temperature (lowest): " + convertToFahrenheit(data.main.temp_min)));
            $openWeatherInfo.append($("<li></li>").text("cloud: " + data.weather[0].description));
            $openWeatherInfo.slideDown("fast");

            // check rain
            let niceOut = parseFloat(data.weather[0].id) >= 700 && convertToFahrenheit(data.main.temp) >= 60;
            fourQuery = niceOut ? "outdoors" : "restaurant";

            // Four Square ajax call
            $.ajax({
                url: fourUrl,
                data: {
                    "client_id": fourClientID,
                    "client_secret": fourSecret,
                    "v": fourVersion,
                    "query": fourQuery,
                    "near": req.city + "," + req.state,
                    "limit": req.numRecommends,
                },
                crossDomain: true,
                dataType: 'jsonp',
            })
                .done(function (data) {
                    if (data.meta.code != 200) {
                        alert("four square returns an error");
                        return;
                    }
                    console.log(data);
                    $fourData.text("");
                    for (let i in data.response.venues) {
                        let currRes = $("<p></p>").text(data.response.venues[i].name);
                        let currDetail = $("<p class='detail'></p>").hide();
                        let currVenue = $("<div></div>").append(currRes);
                        currVenue.append(currDetail);
                        currVenue.attr("id", data.response.venues[i].id);
                        currVenue.click(function () {
                            currVenue.children(".detail").slideToggle("fast");
                            let venueID = $(this).attr("id");
                            if (currVenue.children(".detail").text() == "") {
                                console.log("ajax call for id");
                                $.ajax({
                                    url: fourVenueUrl + venueID,
                                    data: {
                                        "client_id": fourClientID,
                                        "client_secret": fourSecret,
                                        "v": fourVersion,
                                    },
                                    crossDomain: true,
                                    dataType: 'jsonp',
                                })
                                    .done(function (data) {
                                        console.log(data);
                                        currVenue.children(".detail").text(data.response.venue.location.formattedAddress);
                                    });
                            }
                        });
                        $fourData.append($("<li></li>").html(currVenue));
                    }
                    $fourData.slideDown("fast");
                })
                .fail(function (error) {
                    console.log("fq :: " + error);
                    alert("four square returns an error");
                });
        })
        .fail(function (err) {
            alert("openWeather returns an error");
        });
};

// When page is ready
$(document).ready(function () {
    $("#myForm").submit(function () { formSubmit() });
});

//
// helper functions
var getInfo = function () {
    let req = {};
    $.each($("#myForm").serializeArray(), function (i, field) {
        req[field.name] = field.value;
    });

    return req
};

var convertToFahrenheit = function (kelvinString) {
    let celcius = parseFloat(kelvinString) - 273.15;
    let fahrenheit = celcius * 1.8 + 32
    return fahrenheit.toFixed(2);
};