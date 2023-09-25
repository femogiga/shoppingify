import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    quantities: {
      avocado: 0,
      banana: 0,
      bunchOfCarrot: 0,
      chicken: 0,
      chickenLeg: 0,
      porkFillet: 0,
      salmon: 0,
    },
    visible: false,
  },
  reducers: {
    increment: (state, action) => {
      const { productId } = action.payload;
      state.quantities[productId] += 1;
    },
    decrement: (state, action) => {
      const { productId } = action.payload;
      if (state.quant <= 0) {
        state.quantities[productId] = 0;
        return;
      }
      state.quantities[productId] -= 1;
    },
    revealControls: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { increment, decrement, revealControls } = quantitySlice.actions;

export default quantitySlice.reducer;
