import reducer, { fetchIngredients } from '../ingredients';

describe('Тесты, проверяющие работу ingredients', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  test('Проверка pending состояния', () => {
    const state = reducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния', () => {
    const payload = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];
    const state = reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  test('Проверка rejected состояния c ошибкой из action.error.message', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });

  test('Проверка rejected состояния c дефолтной ошибкой при отсутствии message', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: {}
    });
    expect(state.error).toBe('Ошибка загрузки');
  });
});
