// inputs
let buttons = document.querySelectorAll(".buttons");
let screen = document.querySelector("#screen");
let equal = document.querySelector(".equal");
let clearBtn = document.querySelector(".clear");
let deleteBtn = document.querySelector(".btn-delete");
let btnZero = document.querySelector(".zero");

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
    let arrVal = screen.value.split("");
    arrVal.pop();
    let newVal = "";
    arrVal.forEach(letter => {
        newVal += letter;
    });
    screen.value = newVal;
});
