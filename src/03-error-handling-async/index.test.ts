// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    return expect(resolveValue('some_value'))
      .resolves
      .toBe('some_value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('some message'))
      .toThrow('some message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError())
      .toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(() => throwCustomError())
      .toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(async () => await rejectCustomError())
      .rejects.toThrow(new MyAwesomeError());
  });
});
