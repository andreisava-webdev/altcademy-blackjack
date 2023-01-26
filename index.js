// prettier-ignore
const cards = [
    'Ace of clubs', "Ace of diamonds", 'Ace of spades', "Ace of hearts",
    '2 of clubs', '2 of diamonds', '2 of spades', '2 of hearts',
    '3 of clubs', '3 of diamonds', '3 of spades', '3 of hearts',
    '4 of clubs', '4 of diamonds', '4 of spades', '4 of hearts',
    '5 of clubs', '5 of diamonds', '5 of spades', '5 of hearts',
    '6 of clubs', '6 of diamonds', '6 of spades', '6 of hearts',
    '7 of clubs', '7 of diamonds', '7 of spades', '7 of hearts',
    '8 of clubs', '8 of diamonds', '8 of spades', '8 of hearts',
    '9 of clubs', '9 of diamonds', '9 of spades', '9 of hearts',
    '10 of clubs', '10 of diamonds', '10 of spades', '10 of hearts',
    'Jack of clubs', 'Jack of diamonds', 'Jack of spades', 'Jack of hearts',
    'Queen of clubs', 'Queen of diamonds', 'Queen of spades', 'Queen of hearts',
    'King of clubs', 'King of diamonds', 'King of spades', 'King of hearts'
]

var deck = [];
var hand = [];
var points = 0;

// Shuffle array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Returns the first card in the deck and also removes it from the deck
function dealCard() {
  const card = deck[0];
  deck.shift();

  return card;
}

// Calculate the card value. Aces are 11 points if current points + 11 is not higher than 21, else is 1
function getCardValue(card) {
  const lower = ['2', '3', '4', '5', '6', '7', '8', '9'];
  const higher = ['10', 'Jack', 'Queen', 'King'];

  const shortCard = card.split(' ')[0];

  if (shortCard === 'Ace') {
    if (points + 11 <= 21) {
      return 11;
    }

    return 1;
  }

  if (lower.includes(shortCard)) {
    return Number(shortCard);
  }

  if (higher.includes(shortCard)) {
    return 10;
  }
}

// Start the game
function startGame() {
  points = 0;
  deck = shuffle(cards);
  hand = [dealCard(), dealCard()];

  points = getCardValue(hand[0]) + getCardValue(hand[1]);

  if (points === 21) {
    window.alert(
      `BlackJack! You drew ${hand[0]} and ${hand[1]}. Restarting game!`
    );
    startGame();
  }

  const confirm = window.confirm(
    `You drew ${hand[0]} and ${hand[1]}. Your total is ${points}. Click "Ok" to hit or "Cancel" to stand.`
  );

  if (!confirm) {
    return alert(`You stand with ${points} points`);
  } else {
    playRound();
  }
}

// Draws a card and adds it to current points total
function playRound() {
  const drawCard = dealCard();
  hand.push(drawCard);
  points += getCardValue(drawCard);

  if (points === 21) {
    window.alert(`21! You drew ${drawCard}. Restarting game. \n
Your hand: ${hand}`);
    return startGame();
  }

  if (points > 21) {
    window.alert(
      `Bust! You drew ${drawCard} and got ${points} points. Restarting game. \n
Your hand: ${hand}`
    );
    return startGame();
  }

  const confirm = window.confirm(
    `You drew ${drawCard}. Your total is ${points}. Click "Ok" to hit or "Cancel" to stand. \n
Your hand: ${hand}`
  );

  if (!confirm) {
    return alert(`You stand with ${points} points`);
  }

  playRound();
}

startGame();
