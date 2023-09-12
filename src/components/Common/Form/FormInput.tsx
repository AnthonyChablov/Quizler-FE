import React from "react";

interface FormInputProps {
  label: string;
  type: "text" | "number";
  id: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  min,
  max,
  isRequired,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      type === "number" ? parseInt(e.target.value) : e.target.value;
    onChange(inputValue);
  };

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        required={isRequired}
      />
    </div>
  );
};

export default FormInput;
