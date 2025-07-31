// src/features/orders/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      state.list.push(...action.payload); // array of order items
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
