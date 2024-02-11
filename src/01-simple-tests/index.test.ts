import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {

  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add }))
      .toBe(3);
    expect(simpleCalculator({ a: 1, b: 2, action: '+' }))
      .toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract }))
      .toBe(-1);
    expect(simpleCalculator({ a: -1, b: -2, action: '-' }))
      .toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2.5, action: Action.Multiply }))
      .toBe(7.5);
    expect(simpleCalculator({ a: 3, b: 2, action: '*' }))
      .toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Divide }))
      .toBe(2.5);
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide }))
      .toBe(3);
    expect(simpleCalculator({ a: 6, b: 2, action: '/' }))
      .toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate }))
      .toBe(1);
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate }))
      .toBe(16);
    expect(simpleCalculator({ a: 4, b: 2, action: '^' }))
      .toBe(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'some_action' }))
      .toBe(null);

  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: null, action: Action.Multiply }))
      .toBe(null);
  });

});
