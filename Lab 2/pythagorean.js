function validateForm() {
    var form = document.forms["myForm"];
    var a = form["a"].value;
    var b = form["b"].value;
    var c = form["c"].value;
    var submit = a * a + b * b == c * c;

    if (!submit) {
        alert("Invalid Combination");
    }

    return submit;
}