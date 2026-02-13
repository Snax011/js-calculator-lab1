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
    calculationHistory
  };
}
