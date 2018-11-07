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
    
    infoReload(data);
}

function infoReload(data) {
    $.ajax({
        type: "POST",
        url: "#",
        data: data,
        success: function(data) {
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

$(function () {
    $("#submit").click(mySubmit)
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({beforeSend: function(xhr, settings){
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }});
    setInterval(function() {
        infoReload(null);
    }, 5000);
})