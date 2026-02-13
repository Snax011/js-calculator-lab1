// Calculator Demonstration
// This file demonstrates the usage of the calculator functions

const {
  add,
  subtract,
  multiply,
  divide,
  displayHistory,
  clearHistory,
  getHistoryCount
} = require('./index.js');

console.log('=== JavaScript Calculator Demo ===\n');

// Perform some calculations
console.log('Performing calculations...\n');

console.log('add(10, 5):', add(10, 5));
console.log('subtract(20, 8):', subtract(20, 8));
console.log('multiply(6, 7):', multiply(6, 7));
console.log('divide(100, 4):', divide(100, 4));
console.log('add(15, 25):', add(15, 25));

// Display the history
console.log(`\nTotal calculations performed: ${getHistoryCount()}\n`);
displayHistory();

// Additional calculations
console.log('Performing more calculations...\n');
console.log('multiply(12, 3):', multiply(12, 3));
console.log('subtract(50, 23):', subtract(50, 23));

console.log(`\nUpdated total calculations: ${getHistoryCount()}\n`);
displayHistory();

// Demonstrate error handling
console.log('Testing error handling...');
try {
  divide(10, 0);
} catch (error) {
  console.log('Error caught:', error.message);
}

console.log('\n=== Demo Complete ===');
