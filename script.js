const userChoices = document.querySelectorAll('.user-choice');
const cpuChoices = document.querySelectorAll('.cpu-choice');
const playButton = document.getElementById('play');
const resultDisplay = document.getElementById('roundResult');
const userScoreDisplay = document.getElementById('userScore');
const computerScoreDisplay = document.getElementById('computerScore');
const restartButton = document.getElementById('restart');
const userMoveHistory = document.getElementById('userMoveHistory');
const cpuMoveHistory = document.getElementById('cpuMoveHistory');
let userScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 3;
const userMoves = [];
const cpuMoves = [];

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * userChoices.length);
    return userChoices[randomIndex].dataset.choice;
}

function playRound(userChoice, cpuChoice) {
    userMoves.push(userChoice);
    cpuMoves.push(cpuChoice);

    if (userChoice === cpuChoice) {
        resultDisplay.textContent = 'Tie';
    } else if (
        (userChoice === '🥌' && cpuChoice === '✂') ||
        (userChoice === '🧻' && cpuChoice === '🥌') ||
        (userChoice === '✂' && cpuChoice === '🧻')
    ) {
        resultDisplay.textContent = 'You win the round';
        userScore++;
        addToUserHistory("Round " + round + ": User chose " + userChoice + " - You win the Round");
    } else {
        resultDisplay.textContent = 'The computer wins the Round';
        computerScore++;
        addToCPUHistory("Round " + round + ": CPU Chose " + cpuChoice + " - The computer wins the Round");
    }
    

    round++;
    updateScore();

    if (round >= maxRounds) {
        showFinalResult();
        displayMoveHistory(); // Llamar a la función aquí
    }
}

function updateScore() {
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
}

function showFinalResult() {
    if (userScore > computerScore) {
        resultDisplay.textContent = '¡You won the game!';
    } else if (computerScore > userScore) {
        resultDisplay.textContent = 'The computer wins the game.';
    } else {
        resultDisplay.textContent = 'The game ends in a draw.';
    }

    restartButton.style.display = 'block';
    disableUserChoices();
    disableCPUChoices();
    //displayMoveHistory();
}

function disableUserChoices() {
    userChoices.forEach(choice => {
        choice.disabled = true;
    });
}

function disableCPUChoices() {
    cpuChoices.forEach(choice => {
        choice.disabled = true;
    });
}

function displayMoveHistory() {
    userMoves.forEach((move, index) => {
        const userMoveElement = document.createElement('div');
        userMoveElement.textContent = `Round ${index + 1}: User chose ${move}`;
        userMoveHistory.appendChild(userMoveElement);
    });

    cpuMoves.forEach((move, index) => {
        const cpuMoveElement = document.createElement('div');
        cpuMoveElement.textContent = `Round ${index + 1}: CPU Chose ${move}`;
        cpuMoveHistory.appendChild(cpuMoveElement);
    });
}

playButton.addEventListener('click', () => {
    if (round < maxRounds) {
        const userChoice = Array.from(userChoices).find(choice => choice.disabled === false).dataset.choice;
        const cpuChoice = getRandomChoice();
        playRound(userChoice, cpuChoice);
        toggleRestartButton();
    }
});

restartButton.addEventListener('click', () => {
    window.location.reload();
});

function toggleRestartButton() {
    if (round >= maxRounds) {
        restartButton.style.display = 'block';
    }
}

function addToUserHistory(result) {
    var listItem = document.createElement('li');
    listItem.textContent = result;
    document.getElementById('user-history-list').appendChild(listItem);
}

function addToCPUHistory(result) {
    var listItem = document.createElement('li');
    listItem.textContent = result;
    document.getElementById('cpu-history-list').appendChild(listItem);
}