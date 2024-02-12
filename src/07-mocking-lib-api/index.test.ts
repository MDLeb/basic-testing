// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

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

  const mockAnswer = { data: 'smth' }
  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(mockAnswer);
    await throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.get).toHaveBeenCalledWith('/posts');

  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(mockAnswer);
    const answer = await throttledGetDataFromApi('/posts');
    expect(answer).toEqual(mockAnswer.data);
  });
});
