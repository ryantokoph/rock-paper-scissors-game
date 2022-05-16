const selectionButtons = document.querySelectorAll('[data-option]');
const finalColumn = document.querySelector('[data-final-column]');
const youScoreSpan = document.querySelector('[data-you-score]');
const cpuScoreSpan = document.querySelector('[data-cpu-score]');
const OPTIONS = [
    {
        name: 'rock',
        icon: '🪨',
        beats: 'scissors'
    },
    {
        name: 'paper',
        icon: '📄',
        beats: 'rock'
    },
    {
        name: 'scissors',
        icon: '✂️',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.option;  //dataset.option allows access to data-option values in html
        const selection = OPTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    });
});

function makeSelection(selection) {
    const computerSelection = cpuSelection();
    const youWin = determineWinner(selection, computerSelection);
    const cpuWin = determineWinner(computerSelection, selection);

    addSelectionResult(computerSelection, cpuWin);
    addSelectionResult(selection, youWin);

    if(youWin) {
        countScore(youScoreSpan);
    }
    else if(cpuWin) {
        countScore(cpuScoreSpan);
    }
};

function cpuSelection() {
    const randomIndex = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[randomIndex];
};

function determineWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div');
    div.innerText = selection.icon;
    div.classList.add('result-selection');
    if(winner) {
        div.classList.add('winner');
    };
    finalColumn.after(div);
}

function countScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}