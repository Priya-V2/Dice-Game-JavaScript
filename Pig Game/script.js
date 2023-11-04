'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const nameOfPlayer1 = document.getElementById('name--0');
const nameOfPlayer2 = document.getElementById('name--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const current = document.querySelector('.current-score');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');

let diceValue,
  playing,
  activePlayer,
  currentScore,
  score,
  nameText = 'Please enter the name of the player';

let playerNameFn = function () {
  let n1 = prompt(nameText, 'Player1');
  let n2 = prompt(nameText, 'Player2');
  n1
    ? (nameOfPlayer1.textContent = n1)
    : (nameOfPlayer1.textContent = 'Player-1');
  n2
    ? (nameOfPlayer2.textContent = n2)
    : (nameOfPlayer2.textContent = 'Player-2');
};

let hiddenNone = function () {
  modal.style.display = 'none';
  overlay.style.display = 'none';
};

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.style.display = 'none';
  playerNameFn();
  console.log(nameOfPlayer1.textContent);
  console.log(nameOfPlayer2.textContent);

  playing = true;
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  hiddenNone();
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 6) + 1;
    dice.style.display = 'inline';
    dice.src = `Images/dice-${diceValue}.png`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore = 0;

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      modal.style.display = 'block';
      overlay.style.display = 'block';
      const winnerName = document.getElementById(
        `name--${activePlayer}`
      ).textContent;
      document.querySelector(
        '.g-w'
      ).textContent = `${winnerName.toUpperCase()} wins the game`;
    } else {
      switchPlayer();
    }
  }
});

closeModal.addEventListener('click', hiddenNone);

btnNew.addEventListener('click', init);
