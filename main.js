const gameboard_div = document.querySelector('[data-gameboard]');
const cells_button = document.querySelectorAll('[data-cell]');
const modal_div = document.querySelector('[data-modal]');
const result_p = document.querySelector('[data-result]');
const restart_button = document.querySelector('[data-restart]');
const overlay_div = document.querySelector('[data-overlay]');

let gameboardModule = (function() {
    // let gameboard = [];
    let round = 0;
    
    let render = function(cell) {
        if (cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        } else if (round % 2 == 0) {
            cell.classList.add('x');   
            gameboard_div.classList.toggle('x'); 
            gameboard_div.classList.toggle('o'); 
            checkForWin();
            round++;
        } else {
            cell.classList.add('o');
            gameboard_div.classList.toggle('x'); 
            gameboard_div.classList.toggle('o'); 
            checkForWin();
            round++;
        }
    }

    let checkForWin = function() {
        if (cells_button[0].innerText != '' && cells_button[0].innerText == cells_button[1].innerText && cells_button[0].innerText == cells_button[2].innerText) {
            announceResult(cells_button[0].innerText);     
        } else if (cells_button[3].innerText != '' && cells_button[3].innerText == cells_button[4].innerText && cells_button[4].innerText == cells_button[5].innerText) {
            announceResult(cells_button[3].innerText);     
        } else if (cells_button[6].innerText != '' && cells_button[6].innerText == cells_button[7].innerText && cells_button[7].innerText == cells_button[8].innerText) {
            announceResult(cells_button[6].innerText); 
        } else if (cells_button[0].innerText != '' && cells_button[0].innerText == cells_button[3].innerText && cells_button[3].innerText == cells_button[6].innerText) {
            announceResult(cells_button[0].innerText);     
        } else if (cells_button[1].innerText != '' && cells_button[1].innerText == cells_button[4].innerText && cells_button[4].innerText == cells_button[7].innerText) {
            announceResult(cells_button[1].innerText); 
        } else if (cells_button[2].innerText != '' && cells_button[2].innerText == cells_button[5].innerText && cells_button[5].innerText == cells_button[8].innerText) {
            announceResult(cells_button[2].innerText); 
        } else if (cells_button[0].innerText != '' && cells_button[0].innerText == cells_button[4].innerText && cells_button[4].innerText == cells_button[8].innerText) {
            announceResult(cells_button[0].innerText); 
        } else if (cells_button[2].innerText != '' && cells_button[2].innerText == cells_button[4].innerText && cells_button[4].innerText == cells_button[6].innerText) {
            announceResult(cells_button[2].innerText); 
        } else if (round == 8) {
            announceResult('T');
        }       
    }

    let announceResult = function(winner) {
        overlay_div.classList.add('active');
        modal_div.classList.add('active');
        if (winner == 'T') {
            result_p.innerText = 'It\'s a tie!';
        } else {
            result_p.innerText = `${winner} has won this game!`;
        }
    }

    let clearGameboard = function() {
        overlay_div.classList.remove('active');
        modal_div.classList.remove('active');
        result_p.innerText = '';
        round = 0;
        cells_button.forEach(cell => cell.innerText = ''); 
    }

    return {
        render,
        clearGameboard
    }
})();

function playerFactory() {
//     return {
//         points,
//         sign? (x or o),
//         yourTurn?? (true or false)
//       }
// 
}

cells_button.forEach(cell => {
    cell.addEventListener('click', () => {
        gameboardModule.render(cell);
        // gameboardModule.checkForWin();
    })
})

restart_button.addEventListener('click', () => {
    gameboardModule.clearGameboard();
});

let signs = ['X','O'];


