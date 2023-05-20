'use client';

import TableRow from './TableRow';
import styles from './Table.module.css';
import inventoryData from './data';

const Table = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.inventoryTable}>
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Stock</th>
            <th>WHS</th>
            <th>Discount%</th>
            <th>Color</th>
            <th>Sizes</th>
            <th>Inventory</th>
            <th>Lead Time</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map(data => {
            return <TableRow key={data.id} data={data} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
