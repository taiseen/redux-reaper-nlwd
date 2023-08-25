import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './feature/counterSlice';
import cartReducer from './feature/cart/cartSlice';
import logger from './middleware/logger';
// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// typescript type for read/write
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
