import Spinner from "./Spinner";

export interface ButtonProps {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  handleClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}
const CustomButton = ({
  label,
  type,
  handleClick,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        type={type}
        onClick={handleClick}
        className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500 disabled:bg-blue-500 ${
          loading || disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading || disabled}
      >
        <div className="flex items-center gap-3">
          {label}
          {loading && <Spinner />}
        </div>
      </button>
    </div>
  );
};

export default CustomButton;
