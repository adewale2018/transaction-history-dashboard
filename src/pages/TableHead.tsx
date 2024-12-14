import { RootState } from "../store";
import { useSelector } from "react-redux";

type Data = {
  id: number;
  label: string;
  handleSort: (key: string) => void;
};

const TableHead: React.FC<{
  data: Data[];
  handleSort: (key: string) => void;
}> = ({ data, handleSort }) => {
  const { sortConfig } = useSelector((state: RootState) => state.transactions);
  const handleClick = (label: keyof Data) => {
    if (label.toLocaleLowerCase() === "date") {
      handleSort(label);
    }
  };

  return (
    <thead>
      <tr className={`bg-gray-100`}>
        {data?.map((label) => (
          <th
            className={`px-6 py-3 border-b text-left  font-bold ${
              label.label.toLowerCase() === "date" ||
              label.label.toLowerCase() === "amount"
                ? "cursor-pointer"
                : ""
            }  ${
              label.label.toLowerCase() === "date"
                ? "text-red-600"
                : "text-gray-600"
            }`}
            key={label.id}
            onClick={(label) => handleClick(label?.label)}
          >
            {label.label}
            {label.label.toLowerCase() === "date" &&
              sortConfig.key === "date" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
