// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, /*THROTTLE_TIME*/ } from './index';

describe('throttledGetDataFromApi', () => {

  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts');
    expect(axiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
   
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
