import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

type TProduct = {
  product: IProduct[];
  total: number;
};

const initialState: TProduct = {
  product: [],
  total: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});
