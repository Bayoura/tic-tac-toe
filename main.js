const namesInput_div = document.querySelector('[data-namesInput]');
const inputForm_form = document.querySelector('[data-inputForm]')
const xName_input = document.getElementById('name-player-one');
const oName_input = document.getElementById('name-player-two');
const xName_div = document.getElementById('player-one')
const oName_div = document.getElementById('player-two')
const submitNames_button = document.querySelector('[data-enterNamesButton]');
const gameboard_div = document.querySelector('[data-gameboard]');
const cells_button = document.querySelectorAll('[data-cell]');
const resultScreen_div = document.querySelector('[data-resultScreen]');
const result_p = document.querySelector('[data-resultMessage]');
const xScore_span = document.querySelector('[data-playerOneScore');
const oScore_span = document.querySelector('[data-playerTwoScore');
const newRound_button = document.querySelector('[data-newRoundButton]');
const newGame_button = document.querySelector('[data-newGameButton]');

let gameboardModule = (function() {

    let turnX;
    const x = 'x';
    const o = 'o';
    // let xScore = 0;
    // let oScore = 0;
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let playerX;
    let playerO;

    let startGame = function() {
        turnX = true;
        updateHoverMark();
        resultScreen_div.classList.remove('active');
        result_p.innerText = '';

        cells_button.forEach(cell => {
            cell.classList.remove(x);
            cell.classList.remove(o);
            cell.removeEventListener('click', render); // IMPORTANT!! Otherwise the event listeners will stack
            cell.addEventListener('click', render, { once: true }); // `once: true` ensures that the event listener only fires once for each element
        })

        newRound_button.addEventListener('click', startGame);
        newGame_button.addEventListener('click', () => {
            resultScreen_div.classList.remove('active');
            namesInput_div.classList.add('active');
            startGame();
        });

        document.addEventListener('DOMContentLoaded', () => {    
            submitNames_button.addEventListener('click', e => {    
                e.preventDefault(); //stop form from submitting   
        
                //check if required fields are filled out
                let checkStatus = inputForm_form.checkValidity();
                inputForm_form.reportValidity();
                if (checkStatus) {
                    createPlayers();
                    namesInput_div.classList.remove('active'); 
                    xScore_span.innerText = playerX.score;
                    oScore_span.innerText = playerO.score;
                    xName_div.innerText = playerX.name;
                    oName_div.innerText = playerO.name;
                }
            })    
        });
    }

    let createPlayers = function() {
        playerX = playerFactory(xName_input.value);
        playerO = playerFactory(oName_input.value);
    }

    let render = function(clickedCell) {
        let cell = clickedCell.target;
        let currentTurn = turnX ? x : o;
        cell.classList.add(currentTurn); 
        if (checkForWin(currentTurn)) {
            endGame(false, currentTurn);
        } else if (checkForDraw()) {
            endGame(true, currentTurn);
        } else {
            updateTurn();
            updateHoverMark();
        }
    }

    let updateTurn = function() {
        turnX = !turnX;
    }

    let updateHoverMark = function() {
        gameboard_div.classList.remove(x);
        gameboard_div.classList.remove(o);
        if (turnX) {
            gameboard_div.classList.add(x);
        } else {
            gameboard_div.classList.add(o);
        }
    }

    let endGame = function(isDraw) {
        if (isDraw) {
            result_p.innerText = 'It\'s a draw!';
        } else {
            if (turnX) {
                playerX.score++;
                xScore_span.innerText = playerX.score;
                result_p.innerText = `${playerX.name} is the winner!`;
            } else {
                playerO.score++;
                oScore_span.innerText = playerO.score;
                result_p.innerText = `${playerO.name} is the winner!`;
            }
            
        }
        resultScreen_div.classList.add('active');
    }

    let checkForWin = function(currentTurn) {   
        return winCombos.some(combination => {
            return combination.every(index => {
                return Array.from(cells_button)[index].classList.contains(currentTurn);
            })
        })
    }

    let checkForDraw = function() {
        return Array.from(cells_button).every(cell => {
            return cell.classList.contains(x) || cell.classList.contains(o);
        })        
    }

    return {
        startGame
    }
})();

function playerFactory(name) {
    const player = {};
    player.name = name;
    player.score = 0;
    return player;
}

gameboardModule.startGame();

