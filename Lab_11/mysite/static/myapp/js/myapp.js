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
    currentName = data.name;
    $.ajax({
        type: "POST",
        url: "#",
        data: data,
        success: function(data) {
            // Select options
            console.log(data);
            if (data.users.length > 0) {
                $("#select").html("");
                for (let i in data.users) {
                    name = data.users[i].name;
                    let option = $("<option></option>").val(name).text(name);
                    if (name === currentName) {
                        option.attr("selected", true);
                    }
                    $("#select").append(option);
                }
            }

            // User data
            if (data.current_user) {
                $("#name").text(data.current_user.name);
                $("#dob").val(data.current_user.dob);
                $("#level").val(data.current_user.level);
                $("#faction").val(data.current_user.faction);
            } else {
                $("#name").text("");
                $("#dob").val("");
                $("#level").val("");
                $("#faction").val("");
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
    // setInterval(function() {
    //     infoReload(null);
    // }, 5000);
})