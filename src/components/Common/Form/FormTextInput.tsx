import React from "react";

interface IFormTextInput {
  label: string;
  quizTitle: string;
  placeHolder: string;
  value: string;
  onChange: (e: any) => void;
  type: string;
  isRequired: boolean;
  displayLabel: boolean; // New prop for conditional label display
}

const FormTextInput = ({
  quizTitle,
  label,
  value,
  placeHolder,
  type,
  isRequired,
  onChange,
  displayLabel, // Destructure the new prop
}: IFormTextInput) => {
  return (
    <div className="mb-5">
      {displayLabel && ( // Conditionally render the label
        <label
          className="block text-gray-700 text-sm font-bold mb-2 "
          htmlFor={quizTitle}
        >
          {label}
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={quizTitle}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        required={isRequired}
      ></input>
    </div>
  );
};

export default FormTextInput;
