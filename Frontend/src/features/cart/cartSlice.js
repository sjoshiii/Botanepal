// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { productId: { size: quantity } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;
      if (!size) return;

      if (!state.items[id]) {
        state.items[id] = { [size]: 1 };
      } else {
        if (state.items[id][size]) {
          state.items[id][size]++;
        } else {
          state.items[id][size] = 1;
        }
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      if (state.items[id] && state.items[id][size]) {
        state.items[id][size]--;

        if (state.items[id][size] <= 0) {
          delete state.items[id][size];
        }

        if (Object.keys(state.items[id]).length === 0) {
          delete state.items[id];
        }
      }
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      if (quantity > 0) {
        if (!state.items[id]) state.items[id] = {};
        state.items[id][size] = quantity;
      }
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
