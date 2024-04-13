import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Form from "../Form";
import { SelectTypeI } from "../../../../utils/interfaces/common";
import { generateRequiredMessage } from "../../../../utils/helpers/dynamic-form-helper";

interface SelectProps {
  label: string;
  name: string;
  required?: boolean;
  width?: string;
  error?: string;
  placeholder?: string;
  rounded?: string;
  padding?: string;
  options: SelectTypeI[] | null;
  register: UseFormRegister<FieldValues>;
  margin?: string;
  otherStyles?: string;
}

const DropDown: React.FC<SelectProps> = ({
  label,
  name,
  options,
  required = false,
  width = "w-[260px]",
  margin = "mb-1",
  error,
  rounded = "rounded",
  padding = "py-3 px-6",
  placeholder = " Select Form",
  register,
  otherStyles,
  ...rest
}) => {
  return (
    <Form.FormGroup otherStyles={`${width} ${margin}`}>
      <Form.Label>
        {label} {required ? <span className="text-red-">*</span> : null}
      </Form.Label>
      <div
        className={`inline-block
      
        border-2 border-primary-gray-180 py-3 text-xl font-normal leading-4xl  ${rounded} ${padding}  bg-white px-1 ${otherStyles}`}
      >
        <select
          {...rest}
          className="shadow-none px-4  w-full outline-none focus-visible:ring-0 bg-white"
          {...register(name, generateRequiredMessage(name, required))}
        >
          <option disabled value="" selected hidden>
            {placeholder}
          </option>

          {options?.map((option) => (
            <option key={option.value} value={option.value} className="">
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default DropDown;
