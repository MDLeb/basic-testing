// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree,  
  // unmockedFunction
 } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: originalModule.unmockedFunction
  }
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  let consoleLogSpy: jest.SpyInstance<void, any>;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  // test('unmockedFunction should log into console', () => {
  //   unmockedFunction();
  //   expect(consoleLogSpy).toHaveBeenCalled();
  // });
});
