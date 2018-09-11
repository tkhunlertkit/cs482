function myFunction(idName) {
    document.getElementById(idName).innerHTML = "";

    var limit = getValidatedInput();
    var tab = document.createElement("TABLE");
    var thead = getHeader("A", "B", "C");

    var tbody = document.createElement("TBODY");
    for(i=1; i<limit; i++) {
        for(j=i; j<limit; j++) {
            for(k=j; k<limit; k++) {
                // Create the row when the conidition is met
                if (i * i + j * j == k * k) {
                    var tr = getRow(i, j, k);
                    tbody.appendChild(tr);
                }
            }
        }
    }

    tab.appendChild(thead);
    tab.appendChild(tbody);

    document.getElementById(idName).appendChild(tab);
}

function getRow(...elems) {
    var tr = document.createElement("TR");

    for (let val of elems) {
        td = document.createElement("TD");
        text = document.createTextNode(val);
        td.appendChild(text);
        tr.appendChild(td);
    }

    return tr;
}

function getHeader(...elems) {
    var tr = document.createElement("TR");

    for (let val of elems) {
        th = document.createElement("TH");
        text = document.createTextNode(val);
        th.appendChild(text);
        tr.appendChild(th);
    }

    var thead = document.createElement("THEAD");
    thead.appendChild(tr);
    return thead;
}

function getValidatedInput() {
    do {
        var limitText = prompt("Enter the Pythagorean limit", "20");
        limit = parseInt(limitText, 10);
    } while (isNaN(limit) || limit < 1 || limit > 300);

    return limit;
}