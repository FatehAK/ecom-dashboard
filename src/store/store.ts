import { configureStore } from '@reduxjs/toolkit';
import inventorySlice, { initialState } from './slices/inventorySlice';
import sessionUtils from 'utils/sessionUtils';

const persistedInventoryState = sessionUtils.loadState(inventorySlice.name);

export const store = configureStore({
  reducer: {
    [inventorySlice.name]: inventorySlice.reducer,
  },
  preloadedState: {
    inventory: {
      ...initialState,
      data: persistedInventoryState || [],
    },
  },
});

store.subscribe(() => {
  sessionUtils.saveState(inventorySlice.name, store.getState()[inventorySlice.name].data);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
