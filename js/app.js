const cards = Array.from(document.querySelectorAll('.card'));
const restart = document.querySelectorAll('.fa-repeat');
const timer = document.querySelector('.timer-container');
const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');
const game = document.getElementById('game');
const time__status = document.querySelector('#time--status');
const stars__status = document.querySelector('#star--status');
const moves__status = document.querySelector('#moves--status');
const stars = document.querySelectorAll('.fa-star');
let starsRating = 3;

const open = [];
const matched = [];

const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
let totalSeconds = 0;

let counter = 0;
let moves = document.querySelector('.moves-display');

/*
?++++++++++++++++++++++++++++++++++++++++++++++++++++
?================== ==>EVENTS<== ====================
?++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

document.addEventListener('DOMContentLoaded', init());
restart.forEach((el) => el.addEventListener('click', resetGame));

/*
?++++++++++++++++++++++++++++++++++++++++++++++++++++
?================== ==>FUNCTIONS<== =================
?++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/

function init() {
  shuffle(cards);
  shufflingDone(cards);
  flipCardsOnClick();
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
  if (counter === 0) {
    setInterval(gameTime, 1000);
  }
  counter++;
  moves.innerText = counter;
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

// https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa\
function gameTime() {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

function handleStars() {
  const [...star] = stars;

  function starDisplay(position) {
    star[position].parentElement.style.display = 'none';
  }

  switch (counter) {
    case 7:
      starDisplay(0);
      starsRating--;
      break;
    case 15:
      starDisplay(1);
      starsRating--;
      break;
    case 20:
      starDisplay(2);
      starsRating--;
    default:
      break;
  }
}

function checkIfCardsMatch(array) {
  if (array[0].children[0].classList[1] === array[1].children[0].classList[1]) {
    matched.push(array[0], array[1]);
    array.length = 0;
    matched.forEach((el) => {
      el.style.border = '5px solid green';
      el.classList.add('tada');
      addRemoveClickEvent(el, 'noClick');
    });
  } else if (
    array[0].children[0].classList[1] !== array[1].children[0].classList[1]
  ) {
    array.forEach((el) => {
      el.style.border = '5px solid red';
      el.classList.add('shake');
      setTimeout(() => {
        removeOpenAndShowClass(el);
        el.classList.remove('noClick');
        el.style.border = 'none';
        el.classList.remove('shake');
      }, 1000);
    });

    array.length = 0;
  }
}

function addRemoveClickEvent(el, klass) {
  el.classList.add(klass);
}

function gameWon(array) {
  if (array.length === 16) {
    displayModal();
  }
}

function displayModal() {
  modal.classList.remove('hidden');
  time__status.innerHTML = timer.innerHTML;
  moves__status.innerText = counter;
  stars__status.innerText = starsRating;
  game.classList.add('blur');
}

function checkOpenArrayLength(el) {
  if (open.length === 1) {
    addRemoveClickEvent(el, 'noClick');
  } else if (open.length === 2) {
    checkIfCardsMatch(open);
  }
}

function flipCardsOnClick() {
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      addOpenAndShowClassToCards(card);
      addCardToOpenList(card, open);
      checkOpenArrayLength(card);
      handleStars();
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
