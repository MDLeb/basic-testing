import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval
} from '.';
import path from 'path';
import fs from 'fs';
import fsPr from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const cb = jest.fn();
  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const cb1 = jest.fn();
  const cb2 = jest.fn();
  const cb3 = jest.fn();

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(cb1, 1000);
    doStuffByInterval(cb2, 2000);
    doStuffByInterval(cb3, 3000);
    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).not.toHaveBeenCalled();
    expect(cb3).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.advanceTimersByTime(6000);
    expect(cb1).toHaveBeenCalledTimes(6);
    expect(cb2).toHaveBeenCalledTimes(3);
    expect(cb3).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test_file.txt';
    const spyPathJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(spyPathJoin).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    await readFileAsynchronously('test_file.txt')
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('test_file.txt'))
      .toBe(null)
  });

  test('should return file content if file exists', async () => {
    const testContent = 'some text';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPr, 'readFile').mockResolvedValue(testContent);
    await readFileAsynchronously('file.txt');
    expect(await readFileAsynchronously('test_file.txt'))
      .toBe('some text')
  });
});