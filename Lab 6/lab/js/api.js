// four square info.
var fourUrl = "https://api.foursquare.com/v2/venues/search";
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

    $fourData.hide();
    $openWeatherInfo.hide();

    // Four Square ajax call
    $.ajax({
        url: fourUrl,
        data: {
            "client_id": fourClientID,
            "client_secret": fourSecret,
            "v": fourVersion,
            "query": fourQuery,
            "near": req.city + "," + req.state,
        },
        crossDomain: true,
        dataType : 'jsonp',
    })
        .done(function (data) {
            $fourData.text("");
            let randResIndices = randoms(req.numRecommends, data.response.venues.length);
            for (let i in randResIndices) {
                $fourData.append(
                    $("<li></li>").text(data.response.venues[randResIndices[i]].name)
                );
            }
            $fourData.slideDown("fast");
        })
        .fail(function (error) {
            console.log(error);
        });

    // Open Weather ajax Call
    $.ajax({
        url: openWeatherUrl,
        data: {
            "APPID": openWeatherAPPID,
            "q": req.city + "," + req.state,
        },
        crossDomain: true,
        dataType : 'jsonp',
    })
        .done(function (data) {
            $openWeatherInfo.text("");
            $openWeatherInfo.append($("<li></li>").text("Temperature (highest): " + convertToFahrenheit(data.main.temp_max)));
            $openWeatherInfo.append($("<li></li>").text("Temperature (now): " + convertToFahrenheit(data.main.temp)));
            $openWeatherInfo.append($("<li></li>").text("Temperature (lowest): " + convertToFahrenheit(data.main.temp_min)));
            $openWeatherInfo.append($("<li></li>").text(
                "cloud: " + data.weather[0].description + " with " + data.clouds.all + "% coverage"
            ));
            $openWeatherInfo.slideDown("fast");
            console.log(data);
        })
        .fail(function (err) {
            console.log("FAIL");
            console.log(err);
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

var randoms = function (numRandom, fromSize) {
    ret = [];
    for (let i = 0; i < numRandom; i++) {
        while (true) {
            let rand = Math.floor(Math.random() * fromSize);
            if (!ret.includes(rand)) {
                ret.push(rand);
                break;
            }
        }
    }

    return ret;
};

var convertToFahrenheit = function (kelvinString) {
    let celcius = parseFloat(kelvinString) - 273.15;
    let fahrenheit = celcius * 1.8 + 32
    return fahrenheit.toFixed(2);
};