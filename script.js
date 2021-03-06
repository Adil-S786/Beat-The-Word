
let a = confirm(`Type each word in the given amount of seconds to score. To play again, just type the current word. Your score will reset`)

window.addEventListener('load', init);

const levels = {
    easy: 4,
    medium: 3,
    hard: 1
};


const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;


const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];


function init() {
    seconds.innerHTML = currentLevel;
    showWord(words);
    wordInput.addEventListener('input', startMatch);
    setInterval(countdown, 1000);
    setInterval(checkStatus, 50);
}


function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    
    if (typeof localStorage['highscore'] === 'undefined' || score > localStorage['highscore']) {
        localStorage['highscore'] = score;
    } else {
        localStorage['highscore'] = localStorage['highscore'];
    }

    
    if (localStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = localStorage['highscore'];
    }

    
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}


function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}


function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    if (time > 0 && isPlaying===true) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}


function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}