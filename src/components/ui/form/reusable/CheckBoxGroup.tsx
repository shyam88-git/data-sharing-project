import React from "react";
import Form from "../Form";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface CheckboxOption {
  label: string;
  value: string;
}

interface CustomCheckboxGroupProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  error?: string;
  register: UseFormRegister<FieldValues>;
  
}

const CheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  name,
  label,
  options,
  error,

  register,
}) => {
  return (
    <Form.FormGroup mb-1>
      {label && <Form.Label>{label}</Form.Label>}
       

      <div>
        {options.map((option ,index) => (
          <label key={option.value} className="flex items-center my-2">
            <input
              type="checkbox"
              value={option.value}
              className="w-5 h-5 rounded-full mr-2"
              {...register(`${name}`)}
              defaultChecked={index<3}

             
              
            />
            <span className="text-xl font-normal leading-3xl">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {!!error && (
        <Form.HelperText
          color=" !text-primary-danger-950"
          otherStyles="!text-xl"
        >
          {error}
        </Form.HelperText>
      )}
    </Form.FormGroup>
  );
};

export default CheckboxGroup;
