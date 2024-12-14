export interface InputProps {
  label: string;
  name: string;
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
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
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
      />
      {(!value || value.trim().length === 0) && (
        <span className="text-sm text-red-400">Required</span>
      )}
    </div>
  );
};

export default TextInput;