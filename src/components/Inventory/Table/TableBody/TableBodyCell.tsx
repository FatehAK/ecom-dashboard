import { useState, useRef } from 'react';
import PencilIcon from 'components/Icons/Pencil';
import styles from './TableBodyCell.module.css';

const TableBodyCell = ({ className, children, blockEdits, ...restProps }) => {
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

  if (!editable) return <td className={className}>{children}</td>;

  return (
    <td className={className} {...restProps} {...listeners}>
      <div className={styles.tableCellContent}>
        {children(cellProps)}
        {showEditIcon && !blockEdits && (
          <button type="button" className={styles.editBtn} onClick={handleEditClick}>
            <PencilIcon width={12} height={12} />
            <span>Edit</span>
          </button>
        )}
        {!showEditIcon && <div className={styles.editPlaceholder}></div>}
      </div>
    </td>
  );
};

export default TableBodyCell;
