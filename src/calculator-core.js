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

module.exports = { add, sub, mul, div };
