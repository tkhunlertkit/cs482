var deck;

function makeDeck() {
    var deck = []
    for (let i=0; i<13; i++) {
        for (let j=0; j<4; j++) {
            deck.push(i + j/10.0);
        }
    }

    return deck;
}

function shuffle(deck) {
    var numCards = deck.length;
    for (let i=0; i<numCards; i++) {
        var j = Math.floor(Math.random() * numCards);
        var t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
    }
}

function createCardDiv(card) {
    var suit = (card * 10) % 10;
    var number = 13 - Math.floor(card);

    xCoor = suit * 98;
    yCoor = number * 73;

    // Create image div
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "card");
    imageDiv.setAttribute("style", "background-image: url(cards.jpg); background-position: " + yCoor + "px " + xCoor + "px");

    return imageDiv;
}

function deal() {
    document.getElementById("cards").innerHTML = "";
    hand = document.getElementById("cards");
    while (hand.childElementCount < 5 && deck.length > 0) {
        hand.appendChild(createCardDiv(deck.pop()));
    }

    if (deck.length <= 0) {
        document.getElementById("deal").setAttribute("class", "disabled");
        document.getElementById("deal").disabled = true;
    }
}

function setup() {
    deck = makeDeck();
    shuffle(deck);
    document.getElementById("deal").addEventListener("click", deal);
}

window.addEventListener("load", setup);