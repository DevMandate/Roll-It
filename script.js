'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const openBtn = document.getElementById('how-to-play');
const closeBtn = document.querySelector('.close-button');

// Variables to keep track of game state
let scores, currentScore, activePlayer, playing;


// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    // Switch to next player logic
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; 

    // Add dice to current score
    if (dice !== 1) {
        // Add dice to current score logic here
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        // Switch to next player logic here
        switchPlayer();
    }
    }
});

// Holding current score functionality
btnHold.addEventListener('click', function () {
    if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if the player has won
    if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        // Switch to next player
        switchPlayer();
    }
    }
});

// New game functionality
btnNew.addEventListener('click', init);

// Modal functionality
openBtn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', function () {
  modal.classList.add('hidden');
});

// Close modal on outside click
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});