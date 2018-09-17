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
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "card");
    imageDiv.setAttribute("style", "background-image: url(cards.jpg); background-position: " + yCoor + "px " + xCoor + "px");

    return imageDiv;
}

function deal() {
    deck = makeDeck();
    shuffle(deck);
    document.getElementById("cards").innerHTML = "";
    document.getElementById("hit").setAttribute("class", "");
}

function draw() {
    hand = document.getElementById("cards");
    if (hand.childElementCount < 5) {
        hand.appendChild(createCardDiv(deck.pop()));
    }

    if (hand.childElementCount >= 5) {
        document.getElementById("hit").setAttribute("class", "disabled");
    }
}

function setup() {
    deal();
    document.getElementById("deal").addEventListener("click", deal);
    document.getElementById("hit").addEventListener("click", draw);
}

window.addEventListener("load", setup);