import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface INewOrderState {
  order: TOrder | null;
  name: string;
  loading: boolean;
  error: string | null;
}

const initialState: INewOrderState = {
  order: null,
  name: '',
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'newOrder/createOrder',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.name = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;
export default newOrderSlice.reducer;
