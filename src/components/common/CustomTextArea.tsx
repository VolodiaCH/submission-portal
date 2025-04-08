import React from "react";
import OptionalRender from "./OptionalRender";

interface CustomTextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 w-full">
        <label
          htmlFor={name}
          className="md:w-1/3 text-gray-700 font-medium text-sm"
        >
          {label}
        </label>

        <div className="w-full md:w-2/3">
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full resize-y rounded-md border px-3 py-2 outline-none 
              ${hasError ? "border-red-500" : "border-gray-300"} 
              focus:border-black focus:ring-1 focus:ring-black transition duration-200 text-sm`}
            rows={4}
          />
          <OptionalRender condition={hasError}>
            <p className="mt-1 text-sm text-red-500">{error}</p>
          </OptionalRender>
        </div>
      </div>
    </div>
  );
};

export default CustomTextArea;
