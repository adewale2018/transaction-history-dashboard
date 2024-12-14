import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { TransactionProps } from "../features/transactions/transactionSlice";

const TableRow = ({
  id,
  date,
  status,
  amount,
  description,
}: TransactionProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 border-b">{id}</td>
      <td className="px-6 py-4 border-b">{date}</td>
      <td className="px-6 py-4 border-b">₦{amount.toFixed(2)}</td>
      <td className="px-6 py-4 border-b">{description}</td>
      <td
        className={`px-6 py-4 border-b capitalize ${
          status === "success"
            ? "text-green-500"
            : status === "pending"
            ? "text-gray-400"
            : "text-red-500"
        }`}
      >
        {status}
      </td>
      <td className="px-6 py-4 border-b">
        <Link to={`/transactions/${id}`}>
          <ExternalLink className="w-4 h-4 cursor-pointer hover:text-blue-600" />
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
