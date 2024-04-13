import React from "react";
import Form from "../Form";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BasicInputStyle, DynamicInputStyle } from "./common-style";

interface CustomRadioInputProps {
  name: string;
  label?: string;

  error?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  variant?: "basic" | "dynamic";
  className?: string;
}

const RadioInput: React.FC<CustomRadioInputProps> = ({
  name,
  label,
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

      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="true"
            className={`
                shadow-none outline-none focus-visible:ring-0
                ${style} ${className}
              `}
            {...register(name, { required })}
          />
          <span className="ml-2">True</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="false"
            className={`
                shadow-none outline-none focus-visible:ring-0
                ${style} ${className}
              `}
            {...register(name, { required })}
          />
          <span className="ml-2">False</span>
        </label>
      </div>

      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default RadioInput;
