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

const core = require('./calculator-core');

let result;

// Route to core functions and handle errors consistently
try {
  if (['help', '-h', '--help'].includes(command)) {
    printUsage();
  }

  if (!['add', 'sub', 'mul', 'div'].includes(command)) {
    console.error(`Unknown command: ${command}`);
    printUsage();
  }

  result = core[command](a, b);
} catch (err) {
  // For known error types, present friendly messages
  if (err instanceof RangeError) {
    console.error('Error:', err.message);
    process.exit(3);
  }
  if (err instanceof TypeError) {
    console.error('Error: both arguments must be valid numbers.');
    process.exit(2);
  }
  console.error('Error:', err.message || err);
  process.exit(1);
}

// Print result to stdout
console.log(result);
