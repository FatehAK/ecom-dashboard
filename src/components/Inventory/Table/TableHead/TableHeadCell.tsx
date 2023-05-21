import ChevronDownIcon from 'components/Icons/ChevronDown';
import styles from './TableHeadCell.module.css';

const TableHeadCell = ({ children, name, type, sortedBy, onSortBy, direction }) => {
  if (!name) return <th>{children}</th>;

  return (
    <th>
      <button className={styles.headCellBtn} type="button" onClick={() => onSortBy(name, type)}>
        {children}
        {name === sortedBy && (
          <span className={styles.arrow} data-direction={direction}>
            <ChevronDownIcon width={12} height={12} />
          </span>
        )}
      </button>
    </th>
  );
};

export default TableHeadCell;
