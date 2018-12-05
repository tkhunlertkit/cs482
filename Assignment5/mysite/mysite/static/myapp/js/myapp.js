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
    $.ajax({
        type: "POST",
        url: "#",
        data: data,
        success: function(data) {
            $("#board").html("");
            for (let i in data.messages) {
                console.log(data.messages[i]);
            }
        }
    });
    console.log(name + " :: " + message);
}

$(function () {
    $("#submit").click(mySubmit)
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({beforeSend: function(xhr, settings){
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }});
})