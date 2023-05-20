import { useState } from 'react';
import ChevronDownIcon from 'components/Icons/ChevronDown';
import styles from './TableRow.module.css';

const TableRow = ({ data, depth = 0 }) => {
  const [isExpanded, setExpanded] = useState(false);

  const isRootRow = data.hasOwnProperty('primary_variants');
  const isColorRow = data.hasOwnProperty('secondary_variants');

  const getChildRows = () => {
    if (isRootRow) return data.primary_variants;
    if (isColorRow) return data.secondary_variants;
    return [];
  };

  const getSizesText = () => {
    if (isRootRow) return data.sizes;
    if (isColorRow) {
      // sets a limit on number of sizes displayed
      const limit = 3;
      const sizesMap = {
        Small: 'S',
        Medium: 'M',
        Large: 'L',
        'Extra Large': 'XL',
      };

      const order = Object.keys(sizesMap);
      // ensure the sizes are in order and slice them by the limit
      const slicedSizes = [...data.secondary_variants]
        .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
        .slice(0, limit);

      const remainingItems = data.secondary_variants.length - limit;
      const str = slicedSizes.reduce((acc, cur, idx) => {
        if (idx !== slicedSizes.length - 1) {
          acc += `${sizesMap[cur.name]}, `;
        } else {
          acc += `${sizesMap[cur.name]}`;
        }
        return acc;
      }, '');

      if (remainingItems > 0) return `${str} +${remainingItems}`;
      return str;
    }
    return null;
  };

  const getColorCircles = () => {
    if (!isRootRow) return null;

    const limit = 2;
    const colorsMap = {
      Red: '#e5896a',
      Green: '#29e577',
      Blue: '#71c1e5',
      Yellow: '#ffc200',
    };

    const remainingItems = data.primary_variants.length - limit;
    const slicedColors = data.primary_variants.slice(0, limit);
    const components = slicedColors.reduce((acc, cur) => {
      acc.push(
        <span
          key={cur.name}
          className={styles.colorCircle}
          style={{ background: colorsMap[cur.name] || '#e0e0e0' }}
        />
      );
      return acc;
    }, []);

    if (remainingItems > 0) components.push(<span key={remainingItems}>+{remainingItems}</span>);
    return components;
  };

  const getVariantCount = () => {
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

  const childRows = getChildRows();

  // padding for nested rows
  const NESTED_ROW_PADDING = 2;

  return (
    <>
      <tr onClick={() => setExpanded(prevExpanded => !prevExpanded)}>
        <td
          className={styles.productTitle}
          style={{ paddingInlineStart: `${depth * NESTED_ROW_PADDING + 2}rem` }}
        >
          <span>{data.title || data.name}</span>
          <span className={styles.variantCount}>{getVariantCount()}</span>
          {childRows.length > 0 && (
            <span
              className={styles.chevronDown}
              style={{ transform: `rotate(${isExpanded ? '180' : '0'}deg)` }}
            >
              <ChevronDownIcon width={12} height={12} />
            </span>
          )}
          {isColorRow && data.active && <span className={styles.activeTag}>Active</span>}
        </td>
        <td>{data.inventory}</td>
        <td>${data.price}</td>
        <td className={styles.bold}>{data.discountPercentage}%</td>
        <td>
          <div className={styles.colorCircleWrap}>{getColorCircles()}</div>
        </td>
        <td className={styles.nowrap}>{getSizesText()}</td>
        <td>{data.inventory}</td>
        <td className={styles.nowrap}>{data.leadTime}</td>
      </tr>
      {isExpanded &&
        childRows.map(data => {
          return <TableRow key={data.name} data={data} depth={depth + 1} />;
        })}
    </>
  );
};

export default TableRow;
