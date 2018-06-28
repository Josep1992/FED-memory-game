const cards = Array.from(document.querySelectorAll('.card'));
const restart = document.querySelector('.fa-repeat');
const timer = document.querySelector('.timer');
const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');
const game = document.getElementById('game');
const time__status = document.querySelector('.time--status');
const stars__status = document.querySelector('.stars--status');
const open = [];
const matched = [];

let counter = 0;
let moves = document.querySelector('.moves');

/*
?++++++++++++++++++++++++++++++++++++++++++++++++++++
?================== ==>EVENTS<== ====================
?++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

document.addEventListener('DOMContentLoaded', init());
restart.addEventListener('click', resetGame);

/*
?++++++++++++++++++++++++++++++++++++++++++++++++++++
?================== ==>FUNCTIONS<== =================
?++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/

function init() {
  shuffle(cards);
  shufflingDone(cards);
  flipCardsOnClick();

  timer.innerText = gameTime(1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shufflingDone(array) {
  array.forEach((card) => {
    deck.innerHTML = '';
    for (let card of array) {
      deck.appendChild(card);
    }
  });
}

function handleMoves() {
  moves.textContent++;
}

function addOpenAndShowClassToCards(element) {
  element.classList.add('open', 'show');
}

function addCardToOpenList(element, array) {
  array.push(element);
}

function removeOpenAndShowClass(element) {
  element.classList.remove('open', 'show');
}

function resetGame() {
  window.location.reload();
}

function gameTime(seconds) {
  setInterval(() => {
    timer.textContent = counter++;
  }, seconds);
}

function checkIfCardsMatch(array) {
  if (array[0].children[0].classList[1] === array[1].children[0].classList[1]) {
    matched.push(array[0], array[1]);
    array.length = 0;
    matched.forEach((el) => (el.style.border = '5px solid green'));
  } else if (
    array[0].children[0].classList[1] !== array[1].children[0].classList[1]
  ) {
    array.forEach((el) => {
      el.style.border = '5px solid red';
      setTimeout(() => {
        removeOpenAndShowClass(el);
        el.style.border = 'none';
      }, 1200);
    });

    array.length = 0;
  }
}

function gameWon(array) {
  array.length === 16 ? displayModal() : console.log(array);
}

function displayModal() {
  modal.classList.remove('hidden');
  time__status.innerText = counter;
  stars__status.innerHTML = [...stars];
  game.insertAdjacentHTML('beforebegin', modal);
}

function flipCardsOnClick() {
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      addOpenAndShowClassToCards(card);
      addCardToOpenList(card, open);
      open.length === 2 ? checkIfCardsMatch(open) : console.log(open);
      gameWon(matched);
      handleMoves();
    });
  });
}

/* 
 * DONE** set up the event listener for a card. If a card is clicked: - display the card's symbol 
 * 
 * 
 * (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards 
 * 
 * 
 * (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position 
 * 
 * 
 * (put this functionality in another function that you call from this one)
 * if the cards do not match, remove the cards from the list and hide the card's symbol 
 * 
 * 
 * (put this functionality in another function that you call from this one)
 * + increment the move counter and display it on the page 
 * 
 * 
 * (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
