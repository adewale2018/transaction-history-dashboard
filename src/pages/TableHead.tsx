type Data = {
  id: number;
  label: string;
};

const TableHead: React.FC<{ data: Data[] }> = ({ data }) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        {data?.map((label) => (
          <th
            className="px-6 py-3 border-b text-left text-gray-600 font-bold"
            key={label.id}
          >
            {label.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
