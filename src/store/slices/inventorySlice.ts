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

export const initialState: InventoryState = {
  data: [],
  isFetching: false,
  isErrored: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateInventory(state, action) {
      const traverseAndUpdate = data => {
        const { rootId, primaryVariantId, secondaryVariantId, fieldToUpdate, value } =
          action.payload;

        for (const item of data) {
          if (item.id === rootId) {
            // if item found at root update
            if (
              primaryVariantId === undefined &&
              secondaryVariantId === undefined &&
              item[fieldToUpdate] !== undefined
            ) {
              item[fieldToUpdate] = value;
              return;
            }
            // if item found at root->primary_variants update
            for (const primaryVariant of item.primary_variants) {
              if (primaryVariant.name === primaryVariantId) {
                if (
                  secondaryVariantId === undefined &&
                  primaryVariant[fieldToUpdate] !== undefined
                ) {
                  primaryVariant[fieldToUpdate] = value;
                  return;
                }
                // if item found at root->primary_variants->secondary_variants update
                for (const secondaryVariant of primaryVariant.secondary_variants) {
                  if (
                    secondaryVariant.name === secondaryVariantId &&
                    secondaryVariant[fieldToUpdate] !== undefined
                  ) {
                    secondaryVariant[fieldToUpdate] = value;
                    return;
                  }
                }
              }
            }
          }
          if (item?.primary_variants?.length) traverseAndUpdate(item.primary_variants);
        }
      };
      traverseAndUpdate(state.data);
    },
  },
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

export const { updateInventory } = inventorySlice.actions;

export default inventorySlice;
