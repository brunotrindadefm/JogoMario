const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
let scorePlacar = 0;
let gameRunning = true; 

const jump = () => {
    if (gameRunning) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const startGame = () => {
    gameRunning = true;
    scorePlacar = 0;
    score.textContent = 'SCORE ' + scorePlacar;

    pipe.style.animation = '';
    pipe.style.left = '';

    mario.style.animation = '';
    mario.style.bottom = '';

    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';

    document.addEventListener('keydown', jump);
    loop = setInterval(gameLoop, 10);
}

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '40px';

        clearInterval(loop);
        gameRunning = false; 

        document.removeEventListener('keydown', jump);
        document.addEventListener('keydown', restartGame);
    } else {
        scoreGrowth();
    }
}

const restartGame = () => {
    document.removeEventListener('keydown', restartGame);
    startGame();
}

document.addEventListener('keydown', jump);

const scoreGrowth = () => {
    if (gameRunning) {
        scorePlacar = scorePlacar + 1;
        score.textContent = 'SCORE ' + scorePlacar;
    }
}

let loop = setInterval(gameLoop, 10);
