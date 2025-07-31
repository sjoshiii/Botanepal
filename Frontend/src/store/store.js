import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/product/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/order/orderSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;  // default export
