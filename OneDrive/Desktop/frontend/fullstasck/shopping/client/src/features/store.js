import { configureStore } from '@reduxjs/toolkit';
import quantityReducer from './quantitySlice';

export const store = configureStore({
  reducer: {
    quantity: quantityReducer,
  },
});
