// Calculator Application
// This application performs basic arithmetic operations and maintains a history of calculations

// Initialize calculation history array
const calculationHistory = [];

/**
 * Adds two numbers
 * @param {number} num1 - First operand
 * @param {number} num2 - Second operand
 * @returns {number} The sum of num1 and num2
 */
function add(num1, num2) {
  const result = num1 + num2;
  addToHistory(num1, num2, '+', result);
  return result;
}

/**
 * Subtracts two numbers
 * @param {number} num1 - First operand (minuend)
 * @param {number} num2 - Second operand (subtrahend)
 * @returns {number} The difference of num1 and num2
 */
function subtract(num1, num2) {
  const result = num1 - num2;
  addToHistory(num1, num2, '-', result);
  return result;
}

/**
 * Multiplies two numbers
 * @param {number} num1 - First operand (multiplicand)
 * @param {number} num2 - Second operand (multiplier)
 * @returns {number} The product of num1 and num2
 */
function multiply(num1, num2) {
  const result = num1 * num2;
  addToHistory(num1, num2, '*', result);
  return result;
}

/**
 * Divides two numbers
 * @param {number} num1 - First operand (dividend)
 * @param {number} num2 - Second operand (divisor)
 * @returns {number} The quotient of num1 and num2
 * @throws {Error} If divisor is zero
 */
function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error('Cannot divide by zero');
  }
  const result = num1 / num2;
  addToHistory(num1, num2, '/', result);
  return result;
}

/**
 * Adds a calculation to the history array
 * @param {number} operand1 - First operand
 * @param {number} operand2 - Second operand
 * @param {string} operator - Operator used (+, -, *, /)
 * @param {number} result - Result of the calculation
 */
function addToHistory(operand1, operand2, operator, result) {
  const calculation = {
    operand1: operand1,
    operand2: operand2,
    operator: operator,
    result: result,
    timestamp: new Date().toLocaleString()
  };
  calculationHistory.push(calculation);
}

/**
 * Displays the calculation history to the user
 * @returns {void}
 */
function displayHistory() {
  if (calculationHistory.length === 0) {
    console.log('No calculations have been performed yet.');
    return;
  }

  console.log('\n=== Calculation History ===');
  calculationHistory.forEach((calc, index) => {
    console.log(
      `${index + 1}. ${calc.operand1} ${calc.operator} ${calc.operand2} = ${calc.result} (${calc.timestamp})`
    );
  });
  console.log('===========================\n');
}

/**
 * Clears the calculation history
 * @returns {void}
 */
function clearHistory() {
  calculationHistory.length = 0;
  console.log('Calculation history has been cleared.');
}

/**
 * Gets the total number of calculations in history
 * @returns {number} The number of calculations performed
 */
function getHistoryCount() {
  return calculationHistory.length;
}

/**
 * Gets a specific calculation from history by index
 * @param {number} index - The index of the calculation to retrieve (0-based)
 * @returns {Object|null} The calculation object or null if index is invalid
 */
function getCalculation(index) {
  if (index >= 0 && index < calculationHistory.length) {
    return calculationHistory[index];
  }
  return null;
}

/**
 * DOM Calculator Interface
 * Handles user interaction with the calculator through the HTML interface
 */

// Calculator state
let currentDisplay = '0';
let firstOperand = null;
let operation = null;
let waitingForNewOperand = false;

/**
 * Updates the HTML display with the current value
 * @param {string} value - The value to display
 */
function updateDisplay(value) {
  currentDisplay = value;
  const displayElement = document.getElementById('display');
  if (displayElement) {
    displayElement.textContent = currentDisplay;
  }
}

/**
 * Handles number button clicks
 * @param {string} num - The number or decimal to append
 */
function handleNumberClick(num) {
  if (waitingForNewOperand) {
    currentDisplay = num;
    waitingForNewOperand = false;
  } else {
    currentDisplay = currentDisplay === '0' && num !== '.' ? num : currentDisplay + num;
    // Prevent multiple decimal points
    if (num === '.' && currentDisplay.split('.').length > 2) {
      currentDisplay = currentDisplay.slice(0, -1);
    }
  }
  updateDisplay(currentDisplay);
}

/**
 * Handles operator button clicks
 * @param {string} op - The operator symbol (+, -, *, /)
 */
function handleOperatorClick(op) {
  const inputValue = parseFloat(currentDisplay);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operation) {
    const result = performCalculation(firstOperand, inputValue, operation);
    updateDisplay(String(result));
    firstOperand = result;
  }

  operation = op;
  waitingForNewOperand = true;
}

/**
 * Performs the actual calculation and updates history
 * @param {number} num1 - First operand
 * @param {number} num2 - Second operand
 * @param {string} op - Operation to perform
 * @returns {number} The result of the calculation
 */
function performCalculation(num1, num2, op) {
  let result;
  switch (op) {
    case '+':
      result = add(num1, num2);
      break;
    case '−':
    case '-':
      result = subtract(num1, num2);
      break;
    case '×':
    case '*':
      result = multiply(num1, num2);
      break;
    case '÷':
    case '/':
      result = divide(num1, num2);
      break;
    default:
      result = num2;
  }
  return result;
}

/**
 * Handles equals button click
 */
function handleEquals() {
  const inputValue = parseFloat(currentDisplay);

  if (firstOperand !== null && operation) {
    const result = performCalculation(firstOperand, inputValue, operation);
    updateDisplay(String(result));
    firstOperand = null;
    operation = null;
    waitingForNewOperand = true;
    updateHistoryDisplay();
  }
}

/**
 * Clears the calculator display and resets state
 */
function handleClear() {
  currentDisplay = '0';
  firstOperand = null;
  operation = null;
  waitingForNewOperand = false;
  updateDisplay(currentDisplay);
}

/**
 * Deletes the last character from the display
 */
function handleDelete() {
  if (currentDisplay.length > 1) {
    currentDisplay = currentDisplay.slice(0, -1);
  } else {
    currentDisplay = '0';
  }
  updateDisplay(currentDisplay);
}

/**
 * Updates the HTML history display with calculation records
 */
function updateHistoryDisplay() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;

  if (calculationHistory.length === 0) {
    historyList.innerHTML = '<p class="empty-message">No calculations yet</p>';
    return;
  }

  historyList.innerHTML = calculationHistory
    .map((calc, index) => {
      return `<div class="history-item">
        <strong>${index + 1}.</strong> ${calc.operand1} ${calc.operator} ${calc.operand2} = <strong>${calc.result}</strong>
        <span style="font-size: 0.85em; color: #999; display: block; margin-top: 5px;">${calc.timestamp}</span>
      </div>`;
    })
    .reverse()
    .join('');
}

/**
 * Clears history and updates display
 */
function handleClearHistory() {
  clearHistory();
  updateHistoryDisplay();
}

/**
 * Initialize calculator event listeners when DOM is ready
 */
function initializeCalculator() {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;

  // Number buttons
  const numberButtons = document.querySelectorAll('.btn-number');
  numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      handleNumberClick(btn.getAttribute('data-value'));
    });
  });

  // Operator buttons
  const operatorButtons = {
    'add-btn': '+',
    'subtract-btn': '−',
    'multiply-btn': '×',
    'divide-btn': '÷'
  };

  Object.entries(operatorButtons).forEach(([id, operator]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => handleOperatorClick(operator));
    }
  });

  // Equals button
  const equalsBtn = document.getElementById('equals-btn');
  if (equalsBtn) {
    equalsBtn.addEventListener('click', handleEquals);
  }

  // Clear button
  const clearBtn = document.getElementById('clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', handleClear);
  }

  // Delete button
  const deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', handleDelete);
  }

  // Clear history button
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', handleClearHistory);
  }

  // Initialize display
  updateDisplay(currentDisplay);
}

// Initialize calculator when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeCalculator);
}

// Export functions for use in tests (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    add,
    subtract,
    multiply,
    divide,
    addToHistory,
    displayHistory,
    clearHistory,
    getHistoryCount,
    getCalculation,
    calculationHistory,
    handleNumberClick,
    handleOperatorClick,
    handleEquals,
    handleClear,
    handleDelete,
    handleClearHistory,
    updateDisplay
  };
}
