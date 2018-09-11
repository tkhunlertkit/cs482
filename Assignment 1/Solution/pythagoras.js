//
// Input and Validation

var num;

do {
    num = prompt("Enter");
} while (isNaN(num) || num < 10 || num > 300);

//
// Output

document.write("<table>");

document.write("<thead>");
document.write("<tr>");
document.write("<th>a</th>");
document.write("<th>b</th>");
document.write("<th>c</th>");
document.write("</tr>");
document.write("</thead>");

for (var i = 1; i < num; i++) {
    for (var j = i; j < num; j++) {
        for (var k = j; k < num; k++) {
            if (i * i + j * j == k * k) {
                document.write("<tr>");
                document.write("<td>" + i + "</td>");
                document.write("<td>" + j + "</td>");
                document.write("<td>" + k + "</td>");
                document.write("</tr>");
            }
        }
    }
}

document.write("</table>");
