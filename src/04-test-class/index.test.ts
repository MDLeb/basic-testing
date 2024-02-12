import {
  getBankAccount,
  BankAccount,
  SynchronizationFailedError,
  InsufficientFundsError,
  TransferFailedError
} from './index';
import lodash from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;
  let account2: BankAccount;

  beforeAll(async () => {
    account = getBankAccount(250);
    account2 = getBankAccount(0);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(250);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(300))
      .toThrow(new InsufficientFundsError(250));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(300, account2))
      .toThrow(new InsufficientFundsError(250));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account))
      .toThrow(new TransferFailedError())
  });

  test('should deposit money', () => {
    expect(account.deposit(50).getBalance())
      .toBe(300);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(50).getBalance())
      .toBe(250);
  });

  test('should transfer money', () => {
    expect(account.transfer(100, account2).getBalance()).toBe(150);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed',
    async () => {
      const newRandom = jest.spyOn(lodash, 'random');
      newRandom.mockReturnValueOnce(jest.requireActual('lodash').random(0, 100, false));
      newRandom.mockReturnValueOnce(1);
      const balance = await account.fetchBalance();
      expect(typeof balance).toBe('number');
    });

  test('should set new balance if fetchBalance returned number',
    async () => {
      const prevBalance = account.getBalance();
      const newRandom = jest.spyOn(lodash, 'random');
      newRandom.mockReturnValueOnce(jest.requireActual('lodash').random(0, 100, false));
      newRandom.mockReturnValueOnce(1);

      expect(async () => {
        await account.fetchBalance();
        account.getBalance()
      }).not.toBe(prevBalance);
    });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newRandom = jest.spyOn(lodash, 'random');
    newRandom.mockReturnValueOnce(jest.requireActual('lodash').random(0, 100, false));
    newRandom.mockReturnValueOnce(0);

    await expect(account.synchronizeBalance())
      .rejects.toThrow(
        new SynchronizationFailedError(),
      );
  });
});
