import { useState } from 'react';
import ChevronDownIcon from 'components/Icons/ChevronDown';
import { useDispatch } from 'react-redux';
import { updateInventory } from 'store/slices/inventorySlice';
import TableBodyCell from './TableBodyCell';
import { COLOR_LIST, COLOR_MAP, SIZE_LIST, SIZES_MAP } from 'constants/index';
import { MAX_COLORS_TO_DISPLAY, MAX_SIZES_TO_DISPLAY, NESTED_ROW_PADDING } from '../config';
import styles from './TableBodyRow.module.css';

const TableBodyRow = ({ data, rowId, rowSiblings, depth = 0, blockEdits }) => {
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState(false);

  const isRootRow = depth === 0;
  const isColorRow = depth === 1;

  const getChildRows = () => {
    if (isRootRow) return data.primary_variants;
    if (isColorRow) return data.secondary_variants;
    return [];
  };

  const renderColorShapes = () => {
    if (!isRootRow) return null;
    // slice to limit the number of colors displayed in the table
    const slicedColors = data.primary_variants.slice(0, MAX_COLORS_TO_DISPLAY);
    const components = slicedColors.map(cur => (
      <span
        key={cur.name}
        className={styles.colorCircle}
        style={{ background: COLOR_MAP[cur.name] || '#e0e0e0' }}
      />
    ));

    const remainingCount = data.primary_variants.length - MAX_COLORS_TO_DISPLAY;
    if (remainingCount > 0) components.push(<span key={remainingCount}>+{remainingCount}</span>);
    return components;
  };

  const renderSizesText = () => {
    if (isRootRow) return data.sizes;
    if (isColorRow) {
      // ensure the sizes are in order and slice them by the limit
      const slicedSizes = [...data.secondary_variants]
        .sort((a, b) => SIZE_LIST.indexOf(a.name) - SIZE_LIST.indexOf(b.name))
        .slice(0, MAX_SIZES_TO_DISPLAY);
      const sizesText = slicedSizes.map(cur => SIZES_MAP[cur.name]).join(', ');

      const remainingCount = data.secondary_variants.length - MAX_SIZES_TO_DISPLAY;
      if (remainingCount > 0) return `${sizesText} +${remainingCount}`;
      return sizesText;
    }
    return null;
  };

  const renderVariantCount = () => {
    if (isRootRow)
      return `${data.primary_variants.length} ${
        data.primary_variants.length > 1 ? 'colors' : 'color'
      }`;
    if (isColorRow)
      return `${data.secondary_variants.length} ${
        data.secondary_variants.length > 1 ? 'sizes' : 'size'
      }`;
    return null;
  };

  const renderProductTitle = cellProps => {
    if (isRootRow) {
      return (
        <input
          name="title"
          style={{ width: '35ch', minWidth: '8ch' }}
          {...getInputProps(cellProps, data.title)}
        />
      );
    }

    if (!cellProps.isEditing) return <span>{data.name}</span>;
    // we prevent colors already in the table to be selected to avoid duplicates
    const allOptions = isColorRow ? COLOR_LIST : SIZE_LIST;
    const options = allOptions.filter(opt => !rowSiblings.some(o => o.name === opt));
    // add back the current active color
    options.unshift(data.name);
    return (
      <select
        name="name"
        defaultValue={data.name}
        onChange={evt => {
          handleUpdateInventory(evt.target.name, evt.target.value);
          cellProps.cancelEditing();
        }}
        onBlur={() => cellProps.cancelEditing()}
        onClick={evt => {
          // prevent the collapse/expand from occuring in the parent
          evt.stopPropagation();
        }}
        autoFocus
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };

  const getInputProps = (cellProps, value) => {
    return {
      type: 'text',
      readOnly: !cellProps.isEditing,
      className: styles.cellInput,
      ref: cellProps.ref,
      defaultValue: value,
      onBlur: evt => {
        // reset back to old value since data isn't saved yet
        if (evt.target.value !== value) evt.target.value = value;
        cellProps.cancelEditing();
      },
      onClick: evt => {
        // prevent the collapse/expand from triggering in the parent
        evt.stopPropagation();
      },
      onKeyDown: evt => {
        if (evt.key === 'Enter' && evt.target.value.trim().length) {
          handleUpdateInventory(evt.target.name, evt.target.value);
          cellProps.cancelEditing();
        }
      },
    };
  };

  const handleUpdateInventory = (fieldToUpdate, value) => {
    const [rootId, primaryVariantId, secondaryVariantId] = `${rowId}`.split('_');
    const data = {
      rootId: +rootId,
      primaryVariantId,
      secondaryVariantId,
      fieldToUpdate,
      value,
    };
    // update our store
    dispatch(updateInventory(data));
  };

  const childRows = getChildRows();

  return (
    <>
      <tr onClick={() => setExpanded(prevExpanded => !prevExpanded)}>
        <TableBodyCell
          className={styles.productTitle}
          style={{ paddingInlineStart: `${depth * NESTED_ROW_PADDING + 2}rem` }}
          blockEdits={blockEdits}
        >
          {cellProps => (
            <>
              {renderProductTitle(cellProps)}
              <span className={styles.variantCount}>{renderVariantCount()}</span>
              {childRows.length > 0 && (
                <span
                  className={styles.chevronDown}
                  style={{ transform: `rotate(${isExpanded ? '180' : '0'}deg)` }}
                >
                  <ChevronDownIcon width={12} height={12} />
                </span>
              )}
              {isColorRow && data.active && <span className={styles.activeTag}>Active</span>}
            </>
          )}
        </TableBodyCell>
        <TableBodyCell blockEdits={blockEdits}>
          {cellProps => (
            <input
              name="inventory"
              style={{ width: '5ch' }}
              {...getInputProps(cellProps, data.inventory)}
            />
          )}
        </TableBodyCell>
        <TableBodyCell blockEdits={blockEdits}>
          {cellProps => (
            <>
              <span>$</span>
              <input
                name="price"
                style={{ width: '6ch' }}
                {...getInputProps(cellProps, data.price)}
              />
            </>
          )}
        </TableBodyCell>
        <TableBodyCell className={styles.bold} blockEdits={blockEdits}>
          {cellProps => (
            <>
              <input
                name="discountPercentage"
                style={{ width: '3ch' }}
                {...getInputProps(cellProps, data.discountPercentage)}
              />
              <span>%</span>
            </>
          )}
        </TableBodyCell>
        <TableBodyCell>
          <div className={styles.colorCircleWrap}>{renderColorShapes()}</div>
        </TableBodyCell>
        <TableBodyCell className={styles.nowrap}>{renderSizesText()}</TableBodyCell>
        <TableBodyCell className={styles.nowrap} blockEdits={blockEdits}>
          {cellProps => (
            <input
              name="leadTime"
              style={{ width: '7ch' }}
              {...getInputProps(cellProps, data.leadTime)}
            />
          )}
        </TableBodyCell>
      </tr>
      {isExpanded &&
        childRows.map(data => (
          <TableBodyRow
            key={data.name}
            data={data}
            rowId={`${rowId}_${data.name}`}
            rowSiblings={childRows}
            depth={depth + 1}
            blockEdits={blockEdits}
          />
        ))}
    </>
  );
};

export default TableBodyRow;
