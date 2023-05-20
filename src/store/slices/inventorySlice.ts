import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventoryApi from 'api/inventoryApi';

export const fetchInventoryList = createAsyncThunk('inventory/fetchInventoryList', async () => {
  const response = await inventoryApi.fetchInventory();
  return response;
});

export interface InventoryState {
  data: [];
  isFetching: boolean;
  isErrored: boolean;
}

const initialState: InventoryState = {
  data: [],
  isFetching: false,
  isErrored: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInventoryList.pending, state => {
        state.isFetching = true;
      })
      .addCase(fetchInventoryList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isErrored = false;
        state.data = action.payload;
      })
      .addCase(fetchInventoryList.rejected, state => {
        state.isFetching = false;
        state.isErrored = true;
      });
  },
});

export default inventorySlice;
