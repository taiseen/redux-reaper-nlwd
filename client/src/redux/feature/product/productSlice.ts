import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TProductFilter = {
  status: boolean;
  priceRange: number;
};

const initialState: TProductFilter = {
  status: false,
  priceRange: 150,
};

const productSlice = createSlice({
  name: 'productFilter',

  initialState,

  reducers: {
    toggleStage: (state) => {
      state.status = !state.status;
    },

    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { toggleStage, setPriceRange } = actions;
export default reducer;
