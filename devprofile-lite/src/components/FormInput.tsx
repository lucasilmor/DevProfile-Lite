interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormInput({
  type,
  placeholder,
  value,
  onChange,
  required = true,
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
}
