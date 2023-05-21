import { SORT_DIRECTION } from './config';

const sortDataByDirection = (data, sortedBy, direction, type) => {
  const sortedData = data.sort((a, b) => {
    if (type === 'string') {
      const valA = a[sortedBy];
      const valB = b[sortedBy];
      if (direction === SORT_DIRECTION.DOWN) {
        return valB.localeCompare(valA);
      }
      return valA.localeCompare(valB);
    } else {
      const valA = Number(a[sortedBy]);
      const valB = Number(b[sortedBy]);
      if (direction === SORT_DIRECTION.DOWN) {
        return valB - valA;
      }
      return valA - valB;
    }
  });

  return sortedData;
};

export { sortDataByDirection };
