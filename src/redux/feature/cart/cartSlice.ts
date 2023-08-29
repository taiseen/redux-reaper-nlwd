import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

type TCart = {
  product: IProduct[];
  total: number;
};

const initialState: TCart = {
  product: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productExist = state.product.find(
        (product) => product._id === action.payload._id
      );

      productExist
        ? (productExist.quantity = productExist.quantity! + 1)
        : state.product.push({ ...action.payload, quantity: 1 });

      state.total = state.total + action.payload.price;
    },

    decreaseItem: (state, action: PayloadAction<IProduct>) => {
      const productExist = state.product.find(
        (product) => product._id === action.payload._id
      );

      productExist && productExist.quantity! > 1
        ? (productExist.quantity = productExist.quantity! - 1)
        : (state.product = state.product.filter(
            (prod) => prod._id !== action.payload._id
          ));

      state.total = state.total - action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.product = state.product.filter(
        (prod) => prod._id !== action.payload._id
      );

      state.total =
        state.total - action.payload.price * action.payload.quantity!;
    },
  },
});

// redux toolkit - automatically create (actions + reducer) for us...
export const { addToCart, decreaseItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
