#!/usr/bin/env node

// Simple Node.js CLI calculator
// Supported operations: addition (add), subtraction (sub), multiplication (mul), division (div)
// Usage examples:
//   node src/calculator.js add 2 3    -> 5
//   node src/calculator.js sub 5 2    -> 3
//   node src/calculator.js mul 4 3    -> 12
//   node src/calculator.js div 10 2   -> 5

const [,, command, ...args] = process.argv;

function printUsage() {
  console.error('Usage: calculator <add|sub|mul|div> <number> <number>');
  console.error('Examples:');
  console.error('  calculator add 2 3');
  console.error('  calculator sub 5 2');
  process.exit(1);
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

if (!command) {
  printUsage();
}

if (args.length < 2) {
  console.error('Error: two numeric arguments are required.');
  printUsage();
}

const a = toNumber(args[0]);
const b = toNumber(args[1]);

if (a === null || b === null) {
  console.error('Error: both arguments must be valid numbers.');
  process.exit(2);
}

let result;

switch (command) {
  case 'add':
    // Addition
    result = a + b;
    break;
  case 'sub':
    // Subtraction
    result = a - b;
    break;
  case 'mul':
    // Multiplication
    result = a * b;
    break;
  case 'div':
    // Division
    if (b === 0) {
      console.error('Error: division by zero.');
      process.exit(3);
    }
    result = a / b;
    break;
  case 'help':
  case '-h':
  case '--help':
    printUsage();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printUsage();
}

// Print result to stdout
console.log(result);
