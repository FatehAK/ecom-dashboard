'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'src/store/store';
import InventoryTable from 'components/Inventory/Table/Table';
import LineLoader from 'components/LineLoader/LineLoader';
import { fetchInventoryList } from 'redux/slices/inventorySlice';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    const promise = dispatch(fetchInventoryList());
    return () => {
      // cancel api on unmount
      promise.abort();
    };
  }, [dispatch]);

  if (isFetching) return <LineLoader />;

  return (
    <main>
      <InventoryTable data={data} />
    </main>
  );
};

export default InventoryPage;
