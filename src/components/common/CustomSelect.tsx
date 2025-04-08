import React from "react";
import OptionalRender from "./OptionalRender";

interface CustomSelectProps {
  label: string;
  name: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
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
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`w-full border-0 border-b-2 px-1 py-2 outline-none bg-white appearance-none pr-6
              ${hasError ? "border-red-500" : "border-gray-300"} 
              focus:border-black transition duration-200`}
          >
            <option value={0}>Select a level</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <OptionalRender condition={hasError}>
            <p className="mt-1 text-sm text-red-500">{error}</p>
          </OptionalRender>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
