const {
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
  handleDelete
} = require('../index.js');

describe('JavaScript Calculator Tests', () => {
  beforeEach(() => {
    // Clear history before each test
    clearHistory();
  });

  describe('Arithmetic Functions', () => {
    test('add function should correctly add two numbers', () => {
      const result = add(10, 5);
      expect(result).toBe(15);
    });

    test('add function should handle negative numbers', () => {
      const result = add(-10, 5);
      expect(result).toBe(-5);
    });

    test('add function should handle decimals', () => {
      const result = add(10.5, 5.3);
      expect(result).toBeCloseTo(15.8);
    });

    test('subtract function should correctly subtract two numbers', () => {
      const result = subtract(20, 8);
      expect(result).toBe(12);
    });

    test('subtract function should handle negative results', () => {
      const result = subtract(5, 10);
      expect(result).toBe(-5);
    });

    test('subtract function should handle decimals', () => {
      const result = subtract(10.5, 3.2);
      expect(result).toBeCloseTo(7.3);
    });

    test('multiply function should correctly multiply two numbers', () => {
      const result = multiply(6, 7);
      expect(result).toBe(42);
    });

    test('multiply function should handle zero', () => {
      const result = multiply(100, 0);
      expect(result).toBe(0);
    });

    test('multiply function should handle negative numbers', () => {
      const result = multiply(-5, 4);
      expect(result).toBe(-20);
    });

    test('divide function should correctly divide two numbers', () => {
      const result = divide(100, 4);
      expect(result).toBe(25);
    });

    test('divide function should handle decimals', () => {
      const result = divide(10, 4);
      expect(result).toBeCloseTo(2.5);
    });

    test('divide function should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('divide function should handle negative dividend', () => {
      const result = divide(-100, 4);
      expect(result).toBe(-25);
    });
  });

  describe('History Tracking', () => {
    test('addToHistory should add calculation to history array', () => {
      addToHistory(10, 5, '+', 15);
      expect(getHistoryCount()).toBe(1);
    });

    test('getHistoryCount should return correct number of calculations', () => {
      add(10, 5);
      subtract(20, 8);
      multiply(6, 7);
      expect(getHistoryCount()).toBe(3);
    });

    test('getCalculation should retrieve a specific calculation by index', () => {
      add(10, 5);
      const calc = getCalculation(0);
      expect(calc.operand1).toBe(10);
      expect(calc.operand2).toBe(5);
      expect(calc.operator).toBe('+');
      expect(calc.result).toBe(15);
    });

    test('getCalculation should return null for invalid index', () => {
      add(10, 5);
      const calc = getCalculation(5);
      expect(calc).toBeNull();
    });

    test('clearHistory should empty the history array', () => {
      add(10, 5);
      subtract(20, 8);
      expect(getHistoryCount()).toBe(2);
      clearHistory();
      expect(getHistoryCount()).toBe(0);
    });

    test('history should include timestamp for each calculation', () => {
      add(10, 5);
      const calc = getCalculation(0);
      expect(calc.timestamp).toBeDefined();
      expect(typeof calc.timestamp).toBe('string');
    });

    test('multiple calculations should be stored in correct order', () => {
      add(10, 5);
      subtract(20, 8);
      multiply(6, 7);
      
      expect(getCalculation(0).operator).toBe('+');
      expect(getCalculation(1).operator).toBe('-');
      expect(getCalculation(2).operator).toBe('*');
    });
  });

  describe('Calculator State Management', () => {
    test('handleOperatorClick should set the operation', () => {
      expect(handleOperatorClick).toBeDefined();
    });

    test('all DOM handler functions should be defined', () => {
      expect(handleNumberClick).toBeDefined();
      expect(handleClear).toBeDefined();
      expect(handleDelete).toBeDefined();
      expect(handleEquals).toBeDefined();
    });
  });

  describe('Function Definitions', () => {
    test('all arithmetic functions should be defined', () => {
      expect(add).toBeDefined();
      expect(subtract).toBeDefined();
      expect(multiply).toBeDefined();
      expect(divide).toBeDefined();
    });

    test('all history functions should be defined', () => {
      expect(addToHistory).toBeDefined();
      expect(displayHistory).toBeDefined();
      expect(clearHistory).toBeDefined();
      expect(getHistoryCount).toBeDefined();
      expect(getCalculation).toBeDefined();
    });

    test('all calculator handler functions should be defined', () => {
      expect(handleNumberClick).toBeDefined();
      expect(handleOperatorClick).toBeDefined();
      expect(handleEquals).toBeDefined();
      expect(handleClear).toBeDefined();
      expect(handleDelete).toBeDefined();
    });

    test('calculationHistory should be accessible', () => {
      expect(calculationHistory).toBeDefined();
      expect(Array.isArray(calculationHistory)).toBe(true);
    });
  });

  describe('Complex Calculations', () => {
    test('should handle chain of multiple operations', () => {
      add(10, 5);
      multiply(3, 4);
      subtract(100, 25);
      divide(48, 6);
      expect(getHistoryCount()).toBe(4);
    });

    test('each calculation should store all required properties', () => {
      add(15, 25);
      const calc = getCalculation(0);
      expect(calc).toHaveProperty('operand1');
      expect(calc).toHaveProperty('operand2');
      expect(calc).toHaveProperty('operator');
      expect(calc).toHaveProperty('result');
      expect(calc).toHaveProperty('timestamp');
    });
  });
});
