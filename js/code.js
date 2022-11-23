// reference of buttons on html
let buttons = document.querySelectorAll(".buttons");
let operators = document.querySelectorAll(".operators>input");
let screen = document.querySelector("#screen");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".btn-delete");
let btnZero = document.querySelector(".zero");
let btnComma = document.querySelector(".btn-comma");

// processing for all the buttons 1 to 9 including the operators ( - , + , / , *)
// assume that the is no text in the screen
let arr = []; // this array is used to validate if the is a comma on the screen
let noText = true;
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (noText) {
            screen.value += button.value;
            arr.push(button.value);
            return;
        }
        screen.value = button.value;
        noText = !noText;
        arr.push(button.value);
    });
});

// operators are ['/','+','*','-']
// the onclick event of each operator should clear the array used for validating commas
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        arr = [];
    })
})

// equal button
equal.addEventListener('click', () => {
    try {
        if (eval(screen.value).toString().includes('.')) {
            screen.value = eval(screen.value).toFixed(2);
        }
        else {
            screen.value = eval(screen.value);
            arr = [];
        }
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
    arr = []
});

// delete button
deleteBtn.addEventListener('click', () => {
    screen.value = screen.value.slice('0', '-1');
    arr.pop();
});

// comma button
btnComma.addEventListener('click', () => {
    if (!arr.includes('.')) {
        screen.value += btnComma.value;
        arr.push(btnComma.value);
    }
})