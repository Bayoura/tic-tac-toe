const panels_button = document.querySelectorAll('[data-panel]');
const modal_div = document.querySelector('[data-modal]');
const result_p = document.querySelector('[data-result]');
const restart_button = document.querySelector('[data-restart]');
const overlay_div = document.querySelector('[data-overlay]');

let gameboardModule = (function() {
    // let gameboard = [];
    let round = 0;

    let render = function(panel) {
        if (panel.innerText != '') {
            return;
        } else if (round % 2 == 0) {
            panel.innerText = signs[0];    
            round++;
        } else {
            panel.innerText = signs[1];
            round++;
        }
    }

    let checkForWin = function() {
        //announceResult()
        
    }

    let announceResult = function() {
        overlay_div.classList.add('active');
        modal_div.classList.add('active');
        //check if it's a tie or not
        //display_div.innerText = `Player ${} has won this game!` / 'It\'s a tie!';
    }

    let clearGameboard = function() {
        result_p.innerText = '';
        panels_button.forEach(panel => panel.innerText = ''); 
        //clear array
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

panels_button.forEach(panel => {
    panel.addEventListener('click', () => {
        gameboardModule.render(panel);
        gameboardModule.checkForWin();
    })
})

restart_button.addEventListener('click', () => {
    gameboardModule.clearGameboard();
});

let signs = ['X','O'];