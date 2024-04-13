import React from "react";
import Form from "../Form";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BasicInputStyle, DynamicInputStyle } from "./common-style";

interface CustomMultiSelectProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  variant?: "basic" | "dynamic";
  className?: string;
}

const MultiSelect: React.FC<CustomMultiSelectProps> = ({
  name,
  label,
  options,
  error,
  className,
  variant = "basic",
  register,
  required = false,
}) => {
  const style = variant === "dynamic" ? DynamicInputStyle : BasicInputStyle;
  return (
    <Form.FormGroup mb-1>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-red-600">*</span>}
        </Form.Label>
      )}

      <select
        multiple
        className={`
          shadow-none outline-none focus-visible:ring-0
          ${style} ${className}
        `}
        {...register(name, { required })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default MultiSelect;
