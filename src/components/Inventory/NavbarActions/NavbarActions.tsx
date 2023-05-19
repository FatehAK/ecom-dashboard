import PlusIcon from 'components/Icons/Plus';
import ImportIcon from 'components/Icons/Import';
import ExportIcon from 'components/Icons/Export';
import styles from './NavbarActions.module.css';

const NavbarActions = () => {
  return (
    <div className={styles.navbarActions}>
      <button type="button" className={styles.addNewProductBtn}>
        <PlusIcon width={15} height={15} />
        <span>Add New Product</span>
      </button>
      <button type="button" className={styles.importDataBtn}>
        <ImportIcon width={17} height={17} />
        <span>Import Data</span>
      </button>
      <button type="button" className={styles.exportCSVBtn}>
        <ExportIcon width={17} height={17} />
        <span>Export CSV</span>
      </button>
    </div>
  );
};

export default NavbarActions;
