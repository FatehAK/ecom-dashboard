import styles from './LineLoader.module.css';

const LineLoader = () => {
  return (
    <div className={styles.lineLoader}>
      <div className={styles.indeterminate}></div>
    </div>
  );
};

export default LineLoader;
