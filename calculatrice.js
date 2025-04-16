function initialiser_calc(id) {
    const champ = document.getElementById(id + '_resultat');
    champ.value = '0';
}

function add_calc(id, valeur) {
    const champ = document.getElementById(id + '_resultat');
    if (champ.value === '0' || champ.value === 'Erreur') {
        champ.value = valeur.toString();
    } else {
        champ.value += valeur.toString();
    }
}

function f_calc(id, action) {
    const champ = document.getElementById(id + '_resultat');
    let val = champ.value;

    try {
        switch(action) {
            case 'ce': 
                champ.value = '0';
                break;

            case 'nbs': 
                champ.value = val.length > 1 ? val.slice(0, -1) : '0';
                break;

            case '+-': 
                champ.value = parseFloat(val) * -1;
                break;

            case '%': 
                champ.value = parseFloat(val) / 100;
                break;

            case '=': 
                champ.value = eval(val.replace(/x/g, '*').replace(/÷/g, '/'));

                const btnEqual = document.querySelector(`#${id} input[value="="]`);
                btnEqual.classList.add("equal-anim");
                setTimeout(() => btnEqual.classList.remove("equal-anim"), 300);
                break;

            default: 
                if (/[+\-*/.]$/.test(val)) return;
                champ.value += action;
        }
    } catch (e) {
        champ.value = 'Erreur';
    }
}

function key_detect_calc(id, event) {
    const champ = document.getElementById(id + '_resultat');
    const touches_valides = '0123456789.+-*/%';

    if (event.key === 'Enter') {
        f_calc(id, '=');
    } else if (event.key === 'Backspace') {
        f_calc(id, 'nbs');
    } else if (touches_valides.includes(event.key)) {
        add_calc(id, event.key);
    } else {
        event.preventDefault(); 
    }
}
window.onload = function () {
    initialiser_calc('calc');
};
