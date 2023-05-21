'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'src/store/store';
import ClientOnly from 'components/ClientOnly/ClientOnly';
import InventoryTable from 'components/Inventory/Table/Table';
import LineLoader from 'components/LineLoader/LineLoader';
import { fetchInventoryList } from 'store/slices/inventorySlice';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    let promise;
    if (!data.length) {
      promise = dispatch(fetchInventoryList());
    }
    return () => {
      // cancel api on unmount
      promise?.abort();
    };
  }, [dispatch, data]);

  if (isFetching) return <LineLoader />;

  return (
    <main>
      <ClientOnly>
        <InventoryTable data={data} />
      </ClientOnly>
    </main>
  );
};

export default InventoryPage;
