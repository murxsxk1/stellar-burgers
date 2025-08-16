import store, { rootReducer } from '../../store';

describe('Тест rootReducer', () => {
  test('Инициализация rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  })
})