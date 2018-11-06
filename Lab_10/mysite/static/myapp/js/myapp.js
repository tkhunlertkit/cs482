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
        dataType: 'jsonp',
    }).done(function (data) {
        console.log(data);
    })
    console.log(name + " :: " + message);
}

$(function () {
    $("#submit").click(mySubmit)
})