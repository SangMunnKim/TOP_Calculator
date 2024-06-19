const smallDisplay = document.querySelector('#smallDisplay');
const display = document.querySelector('#display');
const numberButton = [...document.querySelectorAll('.button.number')];
const operatorButton = [...document.querySelectorAll('.button.operator:not(#sum)')];
const sumButton = document.querySelector('#sum');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');

// Event listeners for number buttons
numberButton.forEach(button => button.addEventListener('click', () => {
    updateDisplay(button.textContent);
}));

numberButton.forEach(button => button.addEventListener('click', () => {
    updateSmallDisplay(button.textContent);
    scrollToEnd(smallDisplay);
    }
));

operatorButton.forEach(button => button.addEventListener('click', () => {
    const lastCharDisplay = display.textContent.slice(-1);
    const lastCharSmallDisplay = smallDisplay.textContent.slice(-1);

    if (!isOperator(lastCharDisplay)) {
        updateDisplay(button.textContent);
    }

    if (!isOperator(lastCharSmallDisplay)) {
        updateSmallDisplay(button.textContent);
    }
    }
));

clearButton.addEventListener('click', () => {
    updateDisplay(''); 
    updateSmallDisplayDelete('');
});

deleteButton.addEventListener('click', () => {
    updateDisplay(display.textContent.slice(0,-1));
    updateSmallDisplayDelete(smallDisplay.textContent.slice(0,-1))
});

function updateDisplay(value){
    display.textContent = value;
}

function updateSmallDisplay(value){
    if(smallDisplay.textContent == ''){
        smallDisplay.textContent = value;
    } else{
        smallDisplay.textContent += value;
    }
};

function updateSmallDisplayDelete(value){
    smallDisplay.textContent = value;
}


function scrollToEnd(element) {
    element.scrollLeft = element.scrollWidth;
}

function isOperator(character) {
    return ['+', '−', '×', '/'].includes(character);
}

function add(a,b){
    return a+b;
};

function substract(a,b){
    return a-b;
};

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(number1, number2, operator){
    if(operator == 'add'){
        add(number1,number2);
    }
    else if(operate == 'substract'){
        substract(number1, number2);
    }
    else if(operate == 'multiply'){
        multiply(number1,number2);
    }
    else if(operate == 'divide'){
        divide(number1,number2);
    }
}



