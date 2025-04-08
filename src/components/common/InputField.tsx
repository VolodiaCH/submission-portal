import React from "react";
import OptionalRender from "./OptionalRender";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) => {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 w-full">
        <label
          htmlFor={name}
          className="md:w-1/3 text-gray-700 font-medium text-sm"
        >
          {label}
        </label>
        <div className="w-full md:w-2/3">
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`w-full border-0 border-b-2 px-1 py-1 outline-none transition-colors duration-200 ${
              hasError
                ? "border-red-500 focus:border-red-600"
                : "border-gray-300 focus:border-black"
            }`}
          />
          <OptionalRender condition={hasError}>
            <p className="mt-1 text-sm text-red-500">{error}</p>
          </OptionalRender>
        </div>
      </div>
    </div>
  );
};

export default InputField;
