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
    let xScore = 0;
    let oScore = 0;
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let startGame = function() {
        turnX = true;
        updateHoverMark();
        resultScreen_div.classList.remove('active');
        result_p.innerText = '';

        cells_button.forEach(cell => {
            cell.classList.remove(x);
            cell.classList.remove(o);
            cell.removeEventListener('click', render); //IMPORTANT!! Otherwise the event listeners will stack
            cell.addEventListener('click', render, { once: true }); // `once: true` ensures that the event listener only fires once for each element
        })
        newRound_button.addEventListener('click', startGame);
        newGame_button.addEventListener('click', () => {
            xScore = 0;
            oScore = 0;
            xScore_span.innerText = xScore;
            oScore_span.innerText = oScore;
            startGame();
        });
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

    let updateHoverMark = function(nextTurn) {
        gameboard_div.classList.remove(x);
        gameboard_div.classList.remove(o);
        if (turnX) {
            gameboard_div.classList.add(x);
        } else {
            gameboard_div.classList.add(o);
        }
    }

    let endGame = function(isDraw, currentTurn) {
        if (isDraw) {
            result_p.innerText = 'It\'s a draw!';
        } else {
            if (turnX) {
                xScore++;
                xScore_span.innerText = xScore;
            } else {
                oScore++;
                oScore_span.innerText = oScore;
            }
            result_p.innerText = `${currentTurn.toUpperCase()} is the winner!`;
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

gameboardModule.startGame();

// function playerFactory() {
// //     return {
// //         points,
// //         sign? (x or o),
// //         yourTurn?? (true or false)
// //       }
// // 
// }
