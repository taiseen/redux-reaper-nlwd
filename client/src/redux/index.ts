import { configureStore } from '@reduxjs/toolkit';
import productReducer from './feature/product/productSlice';
import counterReducer from './feature/counterSlice';
import cartReducer from './feature/cart/cartSlice';
import api from './api/apiSlice';
// import logger from './middleware/logger';
// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    counter: counterReducer, // sync task
    product: productReducer, // sync task
    cart: cartReducer, // sync task

    [api.reducerPath]: api.reducer, // async task || network calling...
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// typescript type for read/write
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
