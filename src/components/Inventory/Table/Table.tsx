import TableRow from './TableRow';
import styles from './Table.module.css';

const Table = ({ data }) => {
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
          {data.map(item => (
            <TableRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
