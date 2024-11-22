import { configureStore } from '@reduxjs/toolkit';
import calculatorSlice from './calculatorSlice';

const store = configureStore({
  reducer: {
    calculator: calculatorSlice,
  },
});

export default store;
