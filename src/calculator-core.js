// Calculator core with exported functions for testing
// Supported operations: addition (add), subtraction (sub), multiplication (mul), division (div)

function toNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError('Invalid number');
  return n;
}

function add(a, b) {
  const x = toNumber(a);
  const y = toNumber(b);
  return x + y;
}

function sub(a, b) {
  const x = toNumber(a);
  const y = toNumber(b);
  return x - y;
}

function mul(a, b) {
  const x = toNumber(a);
  const y = toNumber(b);
  return x * y;
}

function div(a, b) {
  const x = toNumber(a);
  const y = toNumber(b);
  if (y === 0) throw new RangeError('Division by zero');
  return x / y;
}

// Returns the remainder of a divided by b
function modulo(a, b) {
  const x = toNumber(a);
  const y = toNumber(b);
  if (y === 0) throw new RangeError('Modulo by zero');
  return x % y;
}

// Returns base raised to the exponent
function power(base, exponent) {
  const x = toNumber(base);
  const y = toNumber(exponent);
  return Math.pow(x, y);
}

// Returns the square root of n. Throws on negative input
function squareRoot(n) {
  const x = toNumber(n);
  if (x < 0) throw new RangeError('Square root of negative number');
  return Math.sqrt(x);
}

// Export core functions. Provide short aliases (mod, pow, sqrt) for CLI compatibility
module.exports = { add, sub, mul, div, modulo, power, squareRoot, mod: modulo, pow: power, sqrt: squareRoot };
