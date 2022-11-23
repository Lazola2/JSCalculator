// inputs
let buttons = document.querySelectorAll(".buttons");
let operators = document.querySelectorAll(".operators");
let screen = document.querySelector("#screen");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".btn-delete");
let btnZero = document.querySelector(".zero");
let btnComma = document.querySelector(".btn-comma");


// processing for all the buttons 1 to 9 including the operators ( - , + , / , *)
// assume that the is no text in the screen
let noText = true;
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (noText) {
            screen.value += button.value;
            return;
        }
        screen.value = button.value;
        noText = !noText;
    });
});

// equal button
equal.addEventListener('click', () => {
    try {
        eval(screen.value).toString().includes('.') ?
            screen.value = eval(screen.value).toFixed(2) :
            screen.value = eval(screen.value);
        noText = !noText;
    }
    catch (e) {
        alert("Invalid value entered!");
        console.log(e);
        screen.value = "";
    }
});

// clear button
clearBtn.addEventListener('click', () => {
    screen.value = "";
});

// delete button
deleteBtn.addEventListener('click', () => {
    screen.value = screen.value.slice('0', '-1');
});

// comma button
btnComma.addEventListener('click', () => {
    // if (!screen.value.split('').includes('.')) {
    //     screen.value += btnComma.value;
    // }

    alert(validateDecimals(screen.value)?'Still good':'not good')
});

function validateDecimals(value) {
    // value1 : '12.34.44 + 23.43.55' // false
    // value2 : '12..44 + 23.55' // false
    // value3 : '12.34 + 23.55' // true
    let countCommas = 0;
    let vFlag = true;

    // ['1','2','.','3','+','1','.','5']
    value.split('').forEach(val => {
        if (val === '.') countCommas++;
        if (!((['-', '+', '/', '*'].includes(val)) && (countCommas < 2))) 
            vFlag = false;
    })
    return vFlag;
    // value.split('').forEach( val => {

    // })
}


