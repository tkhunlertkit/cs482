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

function infoReload() {
    $.ajax({
        type: "POST",
        url: "#",
        success: function (data) {
            console.log(data);
            $("#out").html("<tr><th>Name</th><th>Level</th><th>Faction</th><th>DOB</th></tr>");
            for (let i in data.users) {
                var $table = $("#out");
                var $tr = $("<tr></tr>");
                $tr.append($("<td></td>").text(data.users[i].name));
                $tr.append($("<td></td>").text(data.users[i].level));
                $tr.append($("<td></td>").text(data.users[i].faction));
                $tr.append($("<td></td>").text(data.users[i].dob));
                $table.append($tr);
            }
        }
    });
}

$(function () {
    $("#butt").click(infoReload);
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({beforeSend: function(xhr, settings){
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }});
    setInterval(function() {
        infoReload();
    }, 5000);
})