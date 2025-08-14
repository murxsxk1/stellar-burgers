import reducer, { fetchOrders, fetchOrderByNumber, clearCurrentOrder } from '../orders';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  };

  const realOrder: TOrder = {
    _id: "689ae636673086001ba8262d",
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0940",
      "643d69a5c3f7b9001cfa093c"
    ],
    status: "done",
    name: "Краторный люминесцентный метеоритный бургер",
    createdAt: "2025-08-12T06:59:02.708Z",
    updatedAt: "2025-08-12T06:59:03.478Z",
    number: 86256
  };

  // === fetchOrders ===
  test('Проверка pending состояния fetchOrders', () => {
    const state = reducer(initialState, { type: fetchOrders.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния fetchOrders', () => {
    const state = reducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload: [realOrder],
    });
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([realOrder]);
  });

  test('Проверка rejected состояния fetchOrders', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = reducer(initialState, {
      type: fetchOrders.rejected.type,
      error: { message: errorMessage },
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // === fetchOrderByNumber ===
  test('Проверка pending состояния fetchOrderByNumber', () => {
    const state = reducer(initialState, { type: fetchOrderByNumber.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния fetchOrderByNumber', () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: realOrder,
    });
    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(realOrder);
  });

  test('Проверка rejected состояния fetchOrderByNumber', () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Ошибка загрузки заказа' },
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказа');
  });

  test('Проверка clearCurrentOrder', () => {
    const filledState = { ...initialState, currentOrder: realOrder };
    const state = reducer(filledState, clearCurrentOrder());
    expect(state.currentOrder).toBeNull();
  });
});
