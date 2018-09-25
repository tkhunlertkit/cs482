var count = 0;
var total = 0;
while (count <= 5) {
    total = total + 10;
    count = count + 1;
}
document.body.innerHTML = total;

function setup() {
    document.title = "TEST";    
    
    
}



window.addEventListener("load", setup);
