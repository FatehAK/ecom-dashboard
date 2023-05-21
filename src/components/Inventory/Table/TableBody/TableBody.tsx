import TableBodyRow from './TableBodyRow';

const TableBody = ({ data, sortedBy }) => {
  const blockEdits = !!sortedBy;

  return (
    <tbody>
      {data.map(item => (
        <TableBodyRow key={item.id} data={item} rowId={item.id} blockEdits={blockEdits} />
      ))}
    </tbody>
  );
};

export default TableBody;
