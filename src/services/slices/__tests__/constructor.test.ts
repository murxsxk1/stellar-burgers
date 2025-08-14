import reducer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from '../constructor';

describe('Тесты, проверяющие работу constructor', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  const ingredient1 = {
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
  };

  const ingredient2 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  };

  test('Добавление ингредиента', () => {
    const state = reducer(initialState, addIngredient(ingredient1));
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
  });

  test('Удаление ингредиента', () => {
    const startState = reducer(initialState, addIngredient(ingredient1));
    const id = startState.constructorItems.ingredients[0].id;

    const state = reducer(startState, removeIngredient(id));
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  test('Изменение порядка ингредиентов в начинке', () => {
    let state = reducer(initialState, addIngredient(ingredient1));
    state = reducer(state, addIngredient(ingredient2));

    expect(state.constructorItems.ingredients.map((i) => i.name)).toEqual([
      'Биокотлета из марсианской Магнолии',
      'Филе Люминесцентного тетраодонтимформа'
    ]);

    state = reducer(state, moveIngredient({ from: 0, to: 1 }));

    expect(state.constructorItems.ingredients.map((i) => i.name)).toEqual([
      'Филе Люминесцентного тетраодонтимформа',
      'Биокотлета из марсианской Магнолии'
    ]);
  });
});
