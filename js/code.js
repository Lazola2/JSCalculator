// reference of buttons on html
let buttons = document.querySelectorAll(".buttons");
let operators = document.querySelectorAll(".operators>input");
let screen = document.querySelector("#screen");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".btn-delete");
let btnZero = document.querySelector(".zero");
let btnComma = document.querySelector(".btn-comma");

// the following array is used to validate if the is a comma on the screen
let arr = [];

// the following array will be the memory for when the user clicks delete
// it will undo the clearing of the array used to validate comma
let memory = [];

// processing for all the buttons 1 to 9 
// assume that the is no text in the screen
let noText = true;
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (noText) {
            screen.value += button.value;
            arr.push(button.value);
            return;
        }
        clearScreen();
        screen.value = button.value;
        noText = !noText;
        arr.push(button.value);
    });
});

// processing the operators including ['/','+','*','-']
// the onclick event of each operator should clear the array used for validating commas
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        memory = [...arr];
        arr = [];
    })
})

// equal button
let clickedEqual = false;
equal.addEventListener('click', () => {
    try {
        if (!eval(screen.value).toString().includes('.')) {
            screen.value = eval(screen.value);
            arr = [];
            return;
        }
        screen.value = eval(screen.value).toFixed(2);
        arr = [...screen.value.split('')];
        memory = [...screen.value.split('')];
        
        noText = !noText;
        clickedEqual = true;
        console.log('clicked equal');
    }
    catch (e) {
        alert("Invalid value entered!");
        console.log(e);
        screen.value = "";
    }
});

// clear button
const clearScreen = () => {
    screen.value = "";
    arr = [];
    memory = [];
}

clearBtn.addEventListener('click', clearScreen);

// delete button
deleteBtn.addEventListener('click', () => {
    // clear the screen if you clicked delete after clicking equal
    if (clickedEqual) {
        screen.value = '';
        clickedEqual = false;
        return;
    }
    screen.value = screen.value.slice('0', '-1');
    memory.pop();
    arr = [...memory];
    arr.pop();
    memory = [...screen.value.split('')]
});

// comma button
btnComma.addEventListener('click', () => {
    if (!arr.includes('.')) {
        screen.value += btnComma.value;
        arr.push(btnComma.value);
    }
})