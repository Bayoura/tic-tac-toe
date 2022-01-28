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
            checkForWin();
            round++;
        } else {
            panel.innerText = signs[1];
            checkForWin();
            round++;
        }
    }

    let checkForWin = function() {
        if (panels_button[0].innerText != '' && panels_button[0].innerText == panels_button[1].innerText && panels_button[0].innerText == panels_button[2].innerText) {
            announceResult(panels_button[0].innerText);     
        } else if (panels_button[3].innerText != '' && panels_button[3].innerText == panels_button[4].innerText && panels_button[4].innerText == panels_button[5].innerText) {
            announceResult(panels_button[3].innerText);     
        } else if (panels_button[6].innerText != '' && panels_button[6].innerText == panels_button[7].innerText && panels_button[7].innerText == panels_button[8].innerText) {
            announceResult(panels_button[6].innerText); 
        } else if (panels_button[0].innerText != '' && panels_button[0].innerText == panels_button[3].innerText && panels_button[3].innerText == panels_button[6].innerText) {
            announceResult(panels_button[0].innerText);     
        } else if (panels_button[1].innerText != '' && panels_button[1].innerText == panels_button[4].innerText && panels_button[4].innerText == panels_button[7].innerText) {
            announceResult(panels_button[1].innerText); 
        } else if (panels_button[2].innerText != '' && panels_button[2].innerText == panels_button[5].innerText && panels_button[5].innerText == panels_button[8].innerText) {
            announceResult(panels_button[2].innerText); 
        } else if (panels_button[0].innerText != '' && panels_button[0].innerText == panels_button[4].innerText && panels_button[4].innerText == panels_button[8].innerText) {
            announceResult(panels_button[0].innerText); 
        } else if (panels_button[2].innerText != '' && panels_button[2].innerText == panels_button[4].innerText && panels_button[4].innerText == panels_button[6].innerText) {
            announceResult(panels_button[2].innerText); 
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
        panels_button.forEach(panel => panel.innerText = ''); 
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
        // gameboardModule.checkForWin();
    })
})

restart_button.addEventListener('click', () => {
    gameboardModule.clearGameboard();
});

let signs = ['X','O'];


