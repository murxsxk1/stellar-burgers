import reducer, { createOrder, clearOrder } from '../newOrder';

describe('Тесты, проверяющие работу newOrder', () => {
  const initialState = {
    order: null,
    name: '',
    loading: false,
    error: null
  };

  test('Проверка pending состояния', () => {
    const state = reducer(initialState, { type: createOrder.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния', () => {
    const payload = {
      success: true,
      name: "Флюоресцентный люминесцентный бургер",
      order: {
        _id: "689ca4e3673086001ba82963",
        ingredients: [
          {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0
          },
          {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
          }
        ],
        owner: {
          name: "danila",
          email: "o@o.o",
          createdAt: "2025-08-04T19:05:34.389Z",
          updatedAt: "2025-08-04T19:05:34.389Z"
        },
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2025-08-13T14:44:51.988Z",
        updatedAt: "2025-08-13T14:44:52.841Z",
        number: 86358,
        price: 2964
      }
    };

    const state = reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload
    });

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(payload.order);
    expect(state.name).toBe(payload.name);
  });

  test('Проверка rejected состояния c ошибкой из action.error.message', () => {
    const state = reducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка сети' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });

  test('Проверка rejected состояния c дефолтной ошибкой при отсутствии message', () => {
    const state = reducer(initialState, {
      type: createOrder.rejected.type,
      error: {}
    });
    expect(state.error).toBe('Ошибка создания заказа');
  });

  test('Проверка clearOrder', () => {
    const filledState = {
      order: {
        _id: "689ca4e3673086001ba82963",
        ingredients: [],
        status: "done",
        name: "Тест",
        createdAt: "",
        updatedAt: "",
        number: 1,
        price: 0,
        owner: { name: "danila", email: "o@o.o", createdAt: "", updatedAt: "" }
      },
      name: 'Тест',
      loading: false,
      error: null
    };

    const state = reducer(filledState, clearOrder());
    expect(state.order).toBeNull();
    expect(state.name).toBe('');
  });
});
