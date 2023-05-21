import ChevronLeftIcon from 'components/Icons/ChevronLeft';
import ChevronRightIcon from 'components/Icons/ChevronRight';
import styles from './Paginator.module.css';

const Paginator = ({ total, perPage, currentPage, goToNextPage, goToPreviousPage, gotoPageAt }) => {
  const shouldPaginate = total > perPage;

  const totalPageCount = Math.ceil(total / perPage);

  return (
    shouldPaginate && (
      <div className={styles.paginator}>
        <button
          type="button"
          title="Previous Page"
          aria-label="Previous Page"
          className={styles.pageAction}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon width={18} height={18} aria-hidden="true" />
        </button>
        {Array.from({ length: totalPageCount }, (_, i) => {
          const isActive = i + 1 === currentPage;
          return (
            <button
              key={i}
              type="button"
              className={styles.pageNumber}
              title={`Goto Page ${i + 1}`}
              aria-label={`Goto Page ${i + 1}`}
              onClick={() => gotoPageAt(i + 1)}
              style={{ borderColor: isActive ? 'var(--color-brand)' : 'var(--white)' }}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          type="button"
          title="Next Page"
          aria-label="Next Page"
          className={styles.pageAction}
          onClick={goToNextPage}
          disabled={currentPage === totalPageCount}
        >
          <ChevronRightIcon width={18} height={18} aria-hidden="true" />
        </button>
      </div>
    )
  );
};

export default Paginator;
