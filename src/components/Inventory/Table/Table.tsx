import TableRow from './TableRow';
import Paginator from 'components/Paginator/Paginator';
import usePaginator from 'hooks/usePaginator';
import { PER_PAGE_COUNT } from './config';
import styles from './Table.module.css';

const Table = ({ data }) => {
  const { pageData, currentPage, goToNextPage, goToPreviousPage, gotoPageAt } = usePaginator(
    data,
    PER_PAGE_COUNT
  );

  return (
    <>
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
            {pageData.map(item => (
              <TableRow key={item.id} data={item} rowId={item.id} />
            ))}
          </tbody>
        </table>
      </div>
      <Paginator
        total={data.length}
        perPage={PER_PAGE_COUNT}
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        gotoPageAt={gotoPageAt}
      />
    </>
  );
};

export default Table;
