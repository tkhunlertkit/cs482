var deck, playerScore, playerNumAces, computerScore, computerNumAces;

function makeDeck() {
    deck = [];
    for (let i=1; i<=13; i++) {
        for (let j=1; j<=4; j++) {
            deck.push({value: i, suit: j});
            deck.push({value: i, suit: j});
        }
    }

    return deck;
}

function shuffleDeck(deck) {
    for (let i=0; i<deck.length; i++) {
        j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function createCardDiv(card) {
    var suit = 4 - (card.suit - 1);
    var number = 13 - (card.value - 1);

    xCoor = suit * 98;
    yCoor = number * 73;

    // Create image div
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "card");
    imageDiv.setAttribute("style", "background-position: " + yCoor + "px " + xCoor + "px");

    return imageDiv;
}

function drawPlayer() {
    let card = deck.pop();
    document.getElementById("player-cards").appendChild(createCardDiv(card));
    if (card.value == 1) {
        playerNumAces += 1;
        console.log("player num aces :: " + playerNumAces);
    }

    score = calculateScore(playerScore, getCardValue(card), playerNumAces);
    playerScore = score[0];
    playerNumAces = score[1];
    document.getElementById("player-score").innerHTML = getDisplayValue(playerScore);
    if (playerScore >= 21) {
        stay();
    }
}

function drawComputer() {
    let card = deck.pop();
    document.getElementById("computer-cards").appendChild(createCardDiv(card));
    score = calculateScore(computerScore, getCardValue(card), computerNumAces);
    computerScore = score[0];
    computerNumAces = score[1];
    document.getElementById("computer-score").innerHTML = getDisplayValue(computerScore);
}

function stay() {
    while (computerScore < 17) {
        drawComputer();
    }

    document.getElementById("hit").setAttribute("class", "disabled");
    document.getElementById("hit").disabled = true;

    document.getElementById("stay").setAttribute("class", "disabled");
    document.getElementById("stay").disabled = true;

    document.getElementById("deal").setAttribute("class", "");
    document.getElementById("deal").disabled = false;

    let result;
    if (computerScore == 21) {
        result = "House wins!";
    } else if (playerScore > 21) {
        result = "House wins!";
    } else if (computerScore <= 21 && computerScore > playerScore) {
        result = "House wins!";
    } else {
        result = "Player wins!";
    }

    document.getElementById("status").innerHTML = result;
}

function getCardValue(card) {
    value = card.value;
    if (value == 1) {
        value = 11;
    } else if (value >= 10) {
        value = 10;
    }

    return value;
}

function getDisplayValue(val) {
    if (val == 21) {
        val = "BlackJack!";
    } else if (val > 21) {
        val = "Bust!";
    }

    return val;
}

function calculateScore(prevScore, newScore, numAces) {
    var score = prevScore + newScore

    console.log(score + " :: " + numAces);
    while (score > 21 && numAces > 0) {
        score -= 10;
        numAces--;
        console.log(score + " :: " + numAces);
    }

    return [score, numAces];
}

function deal() {
    console.log("Deal!");
    reset();

    drawPlayer();
    drawPlayer();
    drawComputer();

}

function reset() {
    deck = makeDeck();
    shuffleDeck(deck);

    playerScore = 0;
    playerNumAces = 0
    computerScore = 0;
    computerNumAces = 0;

    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("computer-cards").innerHTML = "";

    document.getElementById("hit").setAttribute("class", "");
    document.getElementById("hit").disabled = false;

    document.getElementById("stay").setAttribute("class", "");
    document.getElementById("stay").disabled = false;

    document.getElementById("deal").setAttribute("class", "disabled");
    document.getElementById("deal").disabled = true;
}

function setup() {
    deal();

    // Bind
    document.getElementById("deal").addEventListener("click", deal);
    document.getElementById("hit").addEventListener("click", drawPlayer);
    document.getElementById("stay").addEventListener("click", stay);
}

window.addEventListener("load", setup);