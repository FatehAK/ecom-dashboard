import { useState } from 'react';
import TableHeadCell from './TableHeadCell';
import { SORT_DIRECTION } from '../config';

const TableHead = ({ sortedBy, setSortedBy, onSortTable }) => {
  const [direction, setDirection] = useState(SORT_DIRECTION.UP);

  const onSortBy = (name, type) => {
    if (sortedBy !== name) {
      setSortedBy(name);
      onSortTable({ sortedBy: name, direction, type });
    } else if (direction === SORT_DIRECTION.UP) {
      setDirection(SORT_DIRECTION.DOWN);
      onSortTable({ sortedBy: name, direction: SORT_DIRECTION.DOWN, type });
    } else {
      setSortedBy(null);
      setDirection(SORT_DIRECTION.UP);
      onSortTable({ sortedBy: null, direction: SORT_DIRECTION.UP, type });
    }
  };

  return (
    <thead>
      <tr>
        <TableHeadCell>Product Title</TableHeadCell>
        <TableHeadCell
          name="inventory"
          type="number"
          direction={direction}
          sortedBy={sortedBy}
          onSortBy={onSortBy}
        >
          Stock
        </TableHeadCell>
        <TableHeadCell
          name="price"
          type="number"
          direction={direction}
          sortedBy={sortedBy}
          onSortBy={onSortBy}
        >
          WHS
        </TableHeadCell>
        <TableHeadCell
          name="discountPercentage"
          type="number"
          direction={direction}
          sortedBy={sortedBy}
          onSortBy={onSortBy}
        >
          Discount%
        </TableHeadCell>
        <TableHeadCell>Color</TableHeadCell>
        <TableHeadCell>Sizes</TableHeadCell>
        <TableHeadCell
          name="leadTime"
          type="string"
          direction={direction}
          sortedBy={sortedBy}
          onSortBy={onSortBy}
        >
          Lead Time
        </TableHeadCell>
      </tr>
    </thead>
  );
};

export default TableHead;
