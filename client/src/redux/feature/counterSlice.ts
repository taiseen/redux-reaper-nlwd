import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TCounterState = {
  value: number;
};

const initialState: TCounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// redux toolkit - automatically create (actions + reducer) for us...
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
