// get the submit button
function getSubmitButton() {
    var inputs = document.getElementsByTagName("input");
    for (var ind in inputs) {
        var currElem = inputs[ind];
        if (currElem.getAttribute("type") == "submit") {
            return currElem;
        }
    }
}

// Extract all emails inputs
function getEmailInputs() {
    var emails = [];
    var inputs = document.getElementsByTagName("input");
    for (var ind=0; ind<inputs.length; ind++) {
        var currElem = inputs[ind];
        if (currElem.getAttribute("type") == "email") {
            emails.push(currElem);
        }
    }

    return emails;
}

function removeEmail() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

// Create new email entity
function makeNew() {
    // create new input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "email");
    newInput.setAttribute("name", "emails[]");
    newInput.setAttribute("placeholder", "robert.paulson@hotmail.com");
    newInput.required = true;

    // create remove
    var removeLink = document.createElement("a");
    removeLink.setAttribute("href", "javascript:void(0);");
    removeLink.appendChild(document.createTextNode("[-]"));
    removeLink.addEventListener("click", removeEmail);

    // generate new email div
    var newEmailDiv = document.createElement("div");
    newEmailDiv.appendChild(newInput);
    newEmailDiv.appendChild(removeLink);

    // insert newEmailDiv before submit button
    document.getElementById("form").insertBefore(newEmailDiv, getSubmitButton());
}

function validateEmails(evt) {
    var isError = false;
    var emails = getEmailInputs();

    for (var i=0; i<emails.length; i++) {
        for (var j=i+1; j<emails.length; j++) {
            if (emails[i].value == emails[j].value) {
                emails[i].setAttribute("class", "error");
                emails[j].setAttribute("class", "error");
                isError = true;
            }
        }
    }

    if (isError) {
        evt.preventDefault();
    }
}

// Setup when page loads
function setup() {
    // Bind "validateEmails()" to "form" submission
    var form = document.getElementById("form");
    form.addEventListener("submit", validateEmails);

    // Bind "new" to makeNew when clicked.
    var newLink = document.getElementById("new");
    newLink.addEventListener("click", makeNew);

    // call makeNew 3 times
    makeNew();
    makeNew();
    makeNew();
}

// Call setup when page loads.
window.addEventListener("load", setup);