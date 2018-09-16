var deck;

function makeDeck() {
    var deck = []
    for (var i=0; i<52; i++) {
        deck.push(i);
    }

    return deck;
}

function shuffle(deck) {
    var numCards = deck.length;
    for (var i=0; i<numCards; i++) {
        var j = Math.floor(Math.random() * numCards);
        var t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
    }
}

function createCardDiv(card) {
    var suit = Math.floor(card / 13);
    var number = 13 - card % 13;

    xCoor = suit * 98;
    yCoor = number * 73;
    console.log(card + " :: " + suit + ", " + number);

    // Create image div
    var img = document.createElement("img");
    img.setAttribute("src", "cards.jpg");
    img.setAttribute("alt", "");
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "card");
    imageDiv.setAttribute("style", "background-image: url(cards.jpg); background-position: " + yCoor + "px " + xCoor + "px");

    return imageDiv;
}

function hit(deck) {

}

function draw() {

}

function setup() {
    deck = makeDeck();
    shuffle(deck);

    for (var i=0; i<deck.length; i++) {
        var currCard = createCardDiv(deck[i]);
        document.getElementById("cards").appendChild(currCard);
    }
}

window.addEventListener("load", setup);