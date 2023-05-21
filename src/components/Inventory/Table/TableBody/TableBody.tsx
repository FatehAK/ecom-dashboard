import TableBodyRow from './TableBodyRow';

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map(item => (
        <TableBodyRow key={item.id} data={item} rowId={item.id} />
      ))}
    </tbody>
  );
};

export default TableBody;
