#!/usr/bin/env node

// Simple Node.js CLI calculator
// Supported operations: addition (add), subtraction (sub), multiplication (mul), division (div)
// Added operations: modulo (mod), power (pow), square root (sqrt)
// Usage examples:
//   node src/calculator.js add 2 3    -> 5
//   node src/calculator.js sub 5 2    -> 3
//   node src/calculator.js mul 4 3    -> 12
//   node src/calculator.js div 10 2   -> 5
//   node src/calculator.js mod 10 3   -> 1
//   node src/calculator.js pow 2 3    -> 8
//   node src/calculator.js sqrt 9     -> 3

const [,, command, ...args] = process.argv;

function printUsage() {
  console.error('Usage: calculator <add|sub|mul|div|mod|pow|sqrt> <number> <number?>');
  console.error('Examples:');
  console.error('  calculator add 2 3');
  console.error('  calculator sub 5 2');
  console.error('  calculator mod 10 3');
  console.error('  calculator pow 2 3');
  console.error('  calculator sqrt 9');
  process.exit(1);
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

if (!command) {
  printUsage();
}

// Validate arguments depending on command: sqrt expects 1 arg, others expect 2
if (command === 'sqrt') {
  if (args.length < 1) {
    console.error('Error: one numeric argument is required for sqrt.');
    printUsage();
  }
} else {
  if (args.length < 2) {
    console.error('Error: two numeric arguments are required.');
    printUsage();
  }
}

const a = toNumber(args[0]);
const b = args.length > 1 ? toNumber(args[1]) : null;

if (command === 'sqrt') {
  if (a === null) {
    console.error('Error: argument must be a valid number.');
    process.exit(2);
  }
} else {
  if (a === null || b === null) {
    console.error('Error: both arguments must be valid numbers.');
    process.exit(2);
  }
}

const core = require('./calculator-core');

let result;

// Route to core functions and handle errors consistently
try {
  if (['help', '-h', '--help'].includes(command)) {
    printUsage();
  }

  if (!['add', 'sub', 'mul', 'div', 'mod', 'pow', 'sqrt'].includes(command)) {
    console.error(`Unknown command: ${command}`);
    printUsage();
  }

  // Dispatch to core functions. Handle sqrt (single-arg) specially.
  if (command === 'sqrt') {
    result = core.squareRoot(a);
  } else if (command === 'mod') {
    result = core.modulo(a, b);
  } else if (command === 'pow') {
    result = core.power(a, b);
  } else {
    // add, sub, mul, div map directly by name
    result = core[command](a, b);
  }
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
