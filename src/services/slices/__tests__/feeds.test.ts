import reducer, { fetchFeeds } from '../feeds';

describe('Тесты, проверяющие работу feeds', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('Проверка pending состояния', () => {
    const state = reducer(initialState, { type: fetchFeeds.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          ingredients: [],
          status: 'done',
          name: 'Тест заказ',
          createdAt: '',
          updatedAt: '',
          number: 123
        }
      ],
      total: 10,
      totalToday: 2
    };
    const state = reducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload
    });
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  test('Проверка rejected состояния c ошибкой из action.error.message', () => {
    const state = reducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка сети' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });

  test('Проверка rejected состояния c дефолтной ошибкой при отсутствии message', () => {
    const state = reducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: {}
    });
    expect(state.error).toBe('Ошибка загрузки');
  });
});
