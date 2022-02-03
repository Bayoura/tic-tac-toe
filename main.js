const gameboard_div = document.querySelector('[data-gameboard]');
const cells_button = document.querySelectorAll('[data-cell]');
const resultScreen_div = document.querySelector('[data-resultScreen]');
const result_p = document.querySelector('[data-resultMessage]');
const restart_button = document.querySelector('[data-restartButton]');

let gameboardModule = (function() {

    let turnX;
    const x = 'x';
    const o = 'o';
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

        // once: true ensures that the event listener only fires once for each element
        cells_button.forEach(cell => {
            cell.addEventListener('click', () => {render(cell)}, { once: true }); 
        })
        restart_button.addEventListener('click', clearGameboard);
    }
    
    let render = function(cell) {
        let currentTurn = turnX ? x : o;
        cell.classList.add(currentTurn);
        updateTurn();
        updateHoverMark();
        if (checkForWin(currentTurn)) {
            result_p.innerText = `${currentTurn.toUpperCase()} is the winner!`;
            setTimeout(() => resultScreen_div.classList.add('active'), 300);
        } else {
            checkForDraw();
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

    let checkForWin = function(currentTurn) {   
        return winCombos.some(combination => {
            return combination.every(index => {
                return Array.from(cells_button)[index].classList.contains(currentTurn);
            })
        })

    }

    let checkForDraw = function() {
        if (Array.from(cells_button).every(cell => cell.classList.contains(x) || cell.classList.contains(o))) {
            result_p.innerText = 'It\'s a draw!';
            setTimeout(() => resultScreen_div.classList.add('active'), 300);
        }
    }

    let clearGameboard = function() {
        resultScreen_div.classList.remove('active');
        result_p.innerText = '';
        cells_button.forEach(cell => {
            cell.classList.remove(x);
            cell.classList.remove(o);
        }); 
        startGame();
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



