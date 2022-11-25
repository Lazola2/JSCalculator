// reference of buttons on html
let buttons = document.querySelectorAll(".buttons");
let operators = document.querySelectorAll(".operators>input");
let screen = document.querySelector("#screen");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".btn-delete");
let btnZero = document.querySelector(".zero");
let btnComma = document.querySelector(".btn-comma");

// this array is used to validate if the is a comma on the screen
let arr = [];

// this variable will be the memory for when the user clicks delete
// it will undo the clearing of the array used to validate comma
let memory = [];

// processing for all the buttons 1 to 9 including the operators ( - , + , / , *)
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

// operators are ['/','+','*','-']
// the onclick event of each operator should clear the array used for validating commas
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        memory = [...arr];
        arr = [];
    })
})

// equal button
equal.addEventListener('click', () => {
    try {
        if (!eval(screen.value).toString().includes('.')) {
            screen.value = eval(screen.value);
            arr = [];
            return;
        }
        screen.value = eval(screen.value).toFixed(2);
        [memory, arr] = [...screen.value.split('')];
        
        noText = !noText;
    }
    catch (e) {
        alert("Invalid value entered!");
        console.log(e);
        screen.value = "";
    }
    arr.push(screen.value);
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
    if (memory.includes('.')) {
        console.log('the memory has a comma');
        console.log(`memory: [${memory}]`)
    }
    screen.value = screen.value.slice('0', '-1');
    memory.pop();
    arr.pop();
    memory = [...screen.value.split('')]
});

// comma button
btnComma.addEventListener('click', () => {
    if (!arr.includes('.') && !memory.includes('.')) {
        screen.value += btnComma.value;
        arr.push(btnComma.value);
    }
})
