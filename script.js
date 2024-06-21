document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });

    // Listen to keyboard input
    document.addEventListener('keydown', handleKeyPress);

    function handleButtonClick(button) {
        const value = button.textContent; // Get button text content
        if (button.classList.contains('number')) {
            handleNumberInput(value);
        } else if (button.classList.contains('operator')) {
            handleOperatorInput(value);
        } else if (value === 'CLEAR') {
            handleClear();
        } else if (value === 'DELETE') {
            handleDelete();
        }
    }

    function handleKeyPress(event) {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '.') { // Check if the key is a number or decimal
            handleNumberInput(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperatorInput(key);
        } else if (key === 'Enter' || key === '=') {
            handleOperatorInput('=');
        } else if (key === 'Escape') { // Escape key maps to 'CLEAR'
            handleClear();
        } else if (key === 'Backspace') { // Backspace key maps to 'DELETE'
            handleDelete();
        }
        event.preventDefault(); // Prevent the default action to avoid unwanted behavior in the browser
    }

    function handleNumberInput(value) {
        if (currentInput === '0') currentInput = ''; // Remove leading zero
        currentInput += value; // Append number to current input
        display.textContent = currentInput; // Show current input in display
    }

    function handleOperatorInput(value) {
        if (operation === null) {
            if (value === '*'){
                display.textContent = '×'; // Display 'x' for multiplication
            } else {
                display.textContent = value; // Display the operator when no calculation is performed
            }
            
        }
        if (previousInput && currentInput && operation) {
            currentInput = calculate(previousInput, currentInput, operation);
            display.textContent = currentInput;
            previousInput = currentInput;
            currentInput = '';
            operation = null;
        } else if (!previousInput && currentInput) {
            previousInput = currentInput;
            currentInput = '';
        }
        operation = value;
    }

    function handleClear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        display.textContent = '0'; // Reset display
    }

    function handleDelete() {
        currentInput = currentInput.slice(0, -1); // Remove last digit
        display.textContent = currentInput || '0'; // Update display
    }

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return a + b;
            case '−': return a - b;
            case '×': return a * b;
            case '*': return a * b; // Support both '×' and '*' for multiplication
            case '/': return b !== 0 ? a / b : 'Error'; // Prevent division by zero
            default: return '0';
        }
    }
});
