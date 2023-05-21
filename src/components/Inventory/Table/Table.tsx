import { useState } from 'react';
import Paginator from 'components/Paginator/Paginator';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import usePaginator from 'hooks/usePaginator';
import { sortDataByDirection } from './tableUtils';
import { PER_PAGE_COUNT } from './config';
import styles from './Table.module.css';

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const { pageData, currentPage, goToNextPage, goToPreviousPage, goToPageAt } = usePaginator(
    tableData,
    PER_PAGE_COUNT
  );

  const onSortTable = ({ sortedBy, direction, type }) => {
    if (!sortedBy) {
      // remove the sorting
      setTableData(data);
    } else {
      const sortedData = sortDataByDirection([...data], sortedBy, direction, type);
      setTableData(sortedData);
    }
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.inventoryTable}>
          <TableHead onSortTable={onSortTable} />
          <TableBody data={pageData} />
        </table>
      </div>
      <Paginator
        total={data.length}
        perPage={PER_PAGE_COUNT}
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        goToPageAt={goToPageAt}
      />
    </>
  );
};

export default Table;
