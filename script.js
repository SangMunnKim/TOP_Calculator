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
                if(operation === null){
                    display.textContent = value; // Display the operator when no calculation is performed
                }
                if (previousInput && currentInput && operation) {
                    currentInput = calculate(previousInput, currentInput, operation); // Calculate result
                    display.textContent = currentInput; // Display result
                    previousInput = currentInput; // Store the result as the new previousInput for next operation
                    currentInput = ''; // Clear current input for the next number
                    operation = null; // Reset operation
                } else if (!previousInput && currentInput) { // If there's no previous input yet, set currentInput as previousInput
                    previousInput = currentInput;
                    currentInput = '';
                }
                
                operation = value; // Set the new operation
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
