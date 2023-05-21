import { useCallback, useState, useMemo } from 'react';

const usePaginator = (data, perPage) => {
  const [page, setPage] = useState(1);

  const pageData = useMemo(() => {
    return data.slice(page * perPage - perPage, page * perPage);
  }, [data, page, perPage]);

  const goToNextPage = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage(p => p - 1);
  }, []);

  const goToPageAt = useCallback(idx => {
    setPage(idx);
  }, []);

  return {
    pageData,
    currentPage: page,
    goToNextPage,
    goToPreviousPage,
    goToPageAt,
  };
};

export default usePaginator;
