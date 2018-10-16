
$(document).ready(function () {
    $("#title").style("color: pink;");
    $("#title").click(function () {
        let $body = $("#body");
        if ($body.is(":visible")) {
            // slide up
            $body.slideUp("fast");
            $(this).css("background-color", "red");
            $(this).css("color", "white");
        } else {
            //slide down
            $body.slideDown("fast");
            $(this).css("background-color", "blue");
            $(this).css("color", "black");
        }
    });
});