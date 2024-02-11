// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3, testDescription: 'should return' },
  { a: 2, b: 2, action: Action.Add, expected: 4, testDescription: 'should return' },
  { a: 3, b: 2, action: Action.Subtract, expected: 1, testDescription: 'should return' },
  { a: -1, b: -2, action: Action.Subtract, expected: 1, testDescription: 'should return' },
  { a: 2, b: 2, action: Action.Multiply, expected: 4, testDescription: 'should return' },
  { a: 3, b: 2, action: Action.Multiply, expected: 6, testDescription: 'should return' },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5, testDescription: 'should return' },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity, testDescription: 'should return' },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9, testDescription: 'should return' },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5, testDescription: 'should return' },
];

describe('simpleCalculator', () => {
  it.each(testCases)('$testDescription', (i) => {
    expect(simpleCalculator(i)).toEqual(i.expected);
  });
});
