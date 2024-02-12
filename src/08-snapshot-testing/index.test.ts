import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, 'qw', { 1: '1' }]);

    if(list.next){
      expect(list.next.value).toStrictEqual('qw');
    }

    expect(list).toStrictEqual({
      value: 1, next: {
        value: 'qw', next: {
          value: { 1: '1' }, next: {
            value: null, next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 'qw', { 1: '1' }])).toMatchSnapshot();
  });
});
