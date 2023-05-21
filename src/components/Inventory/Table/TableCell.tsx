import { useState, useRef } from 'react';
import PencilIcon from 'components/Icons/Pencil';
import styles from './TableCell.module.css';

const TableCell = ({ className, children, ...restProps }) => {
  const [isEditing, setEditing] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const inputRef = useRef(null);

  const editable = typeof children === 'function';

  const handleEditClick = evt => {
    // prevent the collapse/expand from occuring in the parent
    evt.stopPropagation();
    setEditing(true);
    // focus the input
    inputRef.current?.focus();
  };

  let listeners = {};
  if (editable) {
    listeners = {
      onMouseEnter: () => setShowEditIcon(true),
      onMouseLeave: () => setShowEditIcon(false),
    };
  }

  const cellProps = {
    ref: inputRef,
    isEditing,
    cancelEditing: () => setEditing(false),
  };

  return (
    <td className={className} {...restProps} {...listeners}>
      <div className={styles.tableCellContent}>
        {editable ? children(cellProps) : children}
        {showEditIcon && (
          <button type="button" className={styles.editBtn} onClick={handleEditClick}>
            <PencilIcon width={12} height={12} />
            <span>Edit</span>
          </button>
        )}
        {editable && !showEditIcon && <div className={styles.editPlaceholder}></div>}
      </div>
    </td>
  );
};

export default TableCell;
