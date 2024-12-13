
export interface InputProps {
  label: string;
  name: string;
  type: string;
  id: string;
  placeholder: string;
  required: boolean;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  name,
  value,
  placeholder,
  type,
  id,
  required,
  handleChange,
}: InputProps) => {
  return (
    <div className="mb-10">
      <label htmlFor={id} className="font-mono">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className="px-5 py-2 mt-1 w-full rounded-md bg-white text-sm text-gray-700 shadow-sm border border-blue-500"
      />
    </div>
  );
};

export default TextInput;
