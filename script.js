document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display'); // Access the display element
    let currentInput = ''; // Store current input string
    let previousInput = ''; // Store previous input for calculation
    let operation = null; // Current operation

    // Add event listener to all buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent; // Get button text content

            // Handle number input
            if (button.classList.contains('number')) {
                if (currentInput === '0') currentInput = ''; // Remove leading zero
                currentInput += value; // Append number to current input
                display.textContent = currentInput; // Show current input in display
            }

            // Handle operator input
            else if (button.classList.contains('operator')) {
                if (currentInput && previousInput && operation) {
                    currentInput = calculate(previousInput, currentInput, operation); // Calculate result
                    display.textContent = currentInput; // Display result
                    previousInput = currentInput; // Use the result as the next previous input
                    currentInput = ''; // Prepare for next input
                } else if (!previousInput && currentInput) { // If no previous input and there is current input
                    previousInput = currentInput; // Set current input as previous
                    currentInput = ''; // Clear current input
                } 

                if (value !== '=') {
                    operation = value; // Set operation
                } else {
                    display.textContent = previousInput; // Show the result when '=' is pressed
                    previousInput = ''; // Reset previous input
                    operation = null; // Clear operation
                }
            }

            // Special operations (Clear, Delete)
            else if (value === 'CLEAR') {
                currentInput = '';
                previousInput = '';
                operation = null;
                display.textContent = '0'; // Reset display
            } else if (value === 'DELETE') {
                currentInput = currentInput.slice(0, -1); // Remove last digit
                display.textContent = currentInput || '0'; // Update display
            }
        });
    });

    // Function to perform calculation
    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return a + b;
            case '−': return a - b;
            case '×': return a * b;
            case '/': return b !== 0 ? a / b : 'Error'; // Prevent division by zero
            default: return '0';
        }
    }
});
