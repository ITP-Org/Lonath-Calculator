
const themeShifter = document.querySelector('.theme-shift');
const calculator = document.querySelector('.calculator');
const themeIcon = document.querySelector('.toggle-icon');

let isDark = false;

//light mode to dark mode
themeShifter.onclick = () => {
    calculator.classList.toggle('dark');
    themeShifter.classList.toggle('active');
    isDark == isDark;
};

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let memory = null;
    let operator = null;

    // Function to update display
    function updateDisplay(value) {
        display.textContent = value.toString().slice(0, 12); // Limit display to 12 characters
    }

    // Function to handle number button clicks
    function handleNumberClick(number) {
        if (currentInput === '0') {
            currentInput = number.toString();
        } else {
            currentInput += number.toString();
        }
        updateDisplay(currentInput);
    }

    // Function to handle operator button clicks
    function handleOperatorClick(op) {
        if (currentInput !== '') {
            if (memory === null) {
                memory = parseFloat(currentInput);
            } else {
                applyOperator();
            }
            operator = op;
            currentInput = '';
        }
    }

    // Function to apply operator
    function applyOperator() {
        const inputNum = parseFloat(currentInput);
        switch (operator) {
            case '+':
                memory += inputNum;
                break;
            case '-':
                memory -= inputNum;
                break;
            case '*':
                memory *= inputNum;
                break;
            case '/':
                memory /= inputNum;
                break;
            case '%':
                memory %= inputNum;
                break;
            case '√':
                memory = Math.sqrt(memory);
                break;
            default:
                break;
        }
        updateDisplay(memory);
    }

    // Function to handle clear button click
    function handleClear() {
        currentInput = '';
        memory = null;
        operator = null;
        updateDisplay('0');
    }

    // Function to handle equal button click
    function handleEqual() {
        if (operator && currentInput !== '') {
            const inputNum = parseFloat(currentInput);
            switch (operator) {
                case '+':
                    memory += inputNum;
                    break;
                case '-':
                    memory -= inputNum;
                    break;
                case '*':
                    memory *= inputNum;
                    break;
                case '/':
                    memory /= inputNum;
                    break;
                case '%':
                    memory %= inputNum;
                    break;
                default:
                    break;
            }
            updateDisplay(memory);
            operator = null;
            currentInput = '';
        }
    }

    // Event listeners for number buttons
    document.querySelectorAll('.btn-num').forEach(button => {
        button.addEventListener('click', () => {
            handleNumberClick(button.textContent);
        });
    });

    // Event listeners for operator buttons
    document.querySelectorAll('.btn-operator').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'C') {
                handleClear();
            } else if (button.textContent === '=') {
                handleEqual();
            } else if (button.textContent === '√') {
                handleOperatorClick('√');
            } else {
                handleOperatorClick(button.textContent);
            }
        });
    });

    // Event listener for equal button
    document.getElementById('equal').addEventListener('click', handleEqual);
});