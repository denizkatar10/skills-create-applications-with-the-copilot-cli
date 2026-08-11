const core = require('../calculator-core');

describe('Calculator core', () => {
  test('addition: 2 + 3 => 5', () => {
    expect(core.add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 => 6', () => {
    expect(core.sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 => 90', () => {
    expect(core.mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 => 4', () => {
    expect(core.div(20, 5)).toBe(4);
  });

  test('division by zero should throw', () => {
    expect(() => core.div(1, 0)).toThrow(/division/i);
  });

  test('invalid numeric inputs throw', () => {
    expect(() => core.add('foo', 1)).toThrow(/invalid number/i);
    expect(() => core.sub(1, 'bar')).toThrow(/invalid number/i);
  });

  test('works with numeric strings', () => {
    expect(core.add('2', '3')).toBe(5);
    expect(core.div('20', '5')).toBe(4);
  });

  test('floating point operations', () => {
    expect(core.add(1.5, 2.25)).toBeCloseTo(3.75);
    expect(core.div(7, 2)).toBeCloseTo(3.5);
  });

  test('modulo operation', () => {
    expect(core.modulo(10, 3)).toBe(1);
    expect(core.mod(10, 3)).toBe(1); // alias
  });

  test('modulo by zero should throw', () => {
    expect(() => core.modulo(1, 0)).toThrow(/modulo/i);
  });

  test('power operation', () => {
    expect(core.power(2, 3)).toBe(8);
    expect(core.pow(2, 3)).toBe(8); // alias
  });

  test('square root operation', () => {
    expect(core.squareRoot(9)).toBe(3);
    expect(core.sqrt(16)).toBe(4); // alias
  });

  test('square root of negative should throw', () => {
    expect(() => core.squareRoot(-1)).toThrow(/square root/i);
  });
});
