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
    alert("Hello");
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
    $.ajax({
        type: "POST",
        url: "#",
        data: data,
        success: function(data) {
            console.log(data);
            $("#board").html("");
            for (let i in data.messages) {
                let pTime = $("<p class=\"time\"></p>").text(data.messages[i].timestamp);
                let pName = $("<p class=\"name\"></p>").text(data.messages[i].name + " says:");
                let pContent = $("<p class=\"content\"></p>").text(data.messages[i].content);
                var item = $("<div class=message></div>");
                item.append(pTime).append(pName).append(pContent);
                $("#board").append(item);
            }
        }
    });
}

function addNewUser() {
    alert("Clicked!!");
    name = prompt("Enter Name");
    infoReload({"name": name});
}

$(function () {
    $("#submit").click(mySubmit);
    $("#select").change(function(){
        var option = $(this).children("option:selected").val();
        alert(option);
        infoReload({data: option});
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