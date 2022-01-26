const panels_button = document.querySelectorAll('[data-panel]');
const restart_button = document.querySelector('[data-restart]');

let round = 0;
panels_button.forEach(panel => {
    panel.addEventListener('click', () => {
        
        if (panel.innerText != '') return;
        if(round % 2 == 0) {
            panel.innerText = marks[0];
            round++;
        } else {
            panel.innerText = marks[1];
            round++;
        }
    })        
})

let marks = ['X','O'];