function makeDeck() {
  deck = [];
  for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 13; j++) {
      deck.push([j, i]);
    }
  }

  return deck;
}

function shuffle(deck) {
  for (var i = deck.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = deck[i];
    deck[i] = deck[j];
    deck[j] = t;
  }
}

function getBackgroundPosition(card) {
  return (-73 * (card[0] - 1)) + "px " + (-98 * (card[1] - 1)) + "px";
}

function createCardDiv(card) {
  var div = $("<div class='card'></div>");
  div.css('background-position', getBackgroundPosition(card));
  return div;
}

function getStatusText(score) {
  if (score == 21) {
    return "Blackjack!";
  } else if (score > 21) {
    return "Bust!";
  } else {
    return score;
  }
}

var deck;
var playerScore = 0;
var computerScore = 0;

function deal() {
  deck = makeDeck();
  shuffle(deck);

  playerScore = 0;
  computerScore = 0;
  playerAces = 0;
  computerAces = 0;

  $("#player-cards").empty();
  $("#computer-cards").empty();
  $("#hit").attr("disabled", null);
  $("#stay").attr("disabled", null);
  $("#deal").attr("disabled", "disabled");
  $("#status").text("");
  $("#computer-score").text("?");

  drawPlayer();
  drawPlayer();
  drawComputer();
}

function drawPlayer() {
  var card = deck.pop();

  if (card[0] == 1) {
    playerScore += 11;
    playerAces++;
  } else {
    playerScore += Math.min(card[0], 10);
  }

  while (playerScore > 21 && playerAces > 0) {
    playerScore -= 10;
    playerAces--;
  }

  $("#player-cards").append(createCardDiv(card));
  $("#player-score").text(getStatusText(playerScore));
}

function drawComputer() {
  var card = deck.pop();

  if (card[0] == 1) {
    computerScore += 11;
    computerAces++;
  } else {
    computerScore += Math.min(card[0], 10);
  }

  while (computerScore > 21 && computerAces > 0) {
    computerScore -= 10;
    computerAces--;
  }

  $("#computer-cards").append(createCardDiv(card));
  $("#computer-score").text(getStatusText(computerScore));
}

$("#hit").click(function() {
  drawPlayer();

  if (playerScore >= 21) {
    $("#stay").click();
  }
});

$("#stay").click(function() {
  while (computerScore < 17) {
    drawComputer();
  }

  $("#hit").attr("disabled", "disabled");
  $("#stay").attr("disabled", "disabled");
  $("#deal").attr("disabled", null);

  if (computerScore == 21 || playerScore > 21 || (computerScore < 21 && computerScore >= playerScore)) {
    $("#status").text("House wins!");
  } else {
    $("#status").text("Player wins!");
  }
});

$("#deal").click(function() {
  deal();
});

deal();
