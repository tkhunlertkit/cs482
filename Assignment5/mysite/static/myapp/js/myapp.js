// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function mySubmit() {
    var name = $("#name").val();
    var message = $("#message").val();
    var data = {
        name: name,
        message: message
    }
    console.log("here");
    console.log(Cookies.get('csrftoken'));
    infoReload(data);
}

function infoReload(data) {
    var csrftoken = Cookies.get('csrftoken');
    $.ajax({
        type: "POST",
        url: "#",
        data: data,
        headers:{"X-CSRFToken":csrftoken},
        success: function(data) {
            $("#out").html("");
            for (i in data.options) {
                var currData = data.options[i];
                var $butt = $("<button></button>");
                $butt.val(currData.next_state_id);
                $butt.text(currData.text);
                $("#out").append($butt);
            }
        }
    });
}

function addNewUser() {
    var name = prompt("Enter Name");
    infoReload({name: name});
}

function infoChanged() {
    var name = $("#name").text();
    var dob = $("#dob").val();
    var level = $("#level").val();
    var faction = $("#faction").val();

    infoReload({
        name: name,
        dob: dob,
        level: level,
        faction: faction
    })
}

$(function () {
    $("input").change(infoChanged);
    $("#submit").click(mySubmit);
    $("#select").change(function(){
        var option = $(this).children("option:selected").val();
        if (option) {
            infoReload({name: option});
        }
    });
    $("#newUser").click(addNewUser);
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({beforeSend: function(xhr, settings){
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }});

    $("button").click(function() {
        infoReload(
            {next_state_id: $(this).val()}
        );
    })
    // setInterval(function() {
    //     infoReload(null);
    // }, 5000);
})