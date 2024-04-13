import * as React from "react";
import { SelectTypeI } from "../../../../utils/interfaces/common";
import { BasicInputStyle, DynamicInputStyle } from "./common-style";
import Form from "../Form";

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "basic" | "dynamic";
  rounded?: string;
  padding?: string;
  options: SelectTypeI[];
  name?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register?: any;
  ref?: any;
  isDisabled?: boolean;
}

const SelectInput = React.forwardRef<
  HTMLInputElement,
  SelectInputProps & React.HTMLAttributes<HTMLSelectElement>
>(
  (
    {
      className,
      variant = "basic",
      rounded = "rounded",
      padding = "py-3 px-6",
      placeholder,
      isDisabled = false,
      error,
      options,
      ...props
    },
    ref
  ) => {
    const style = variant === "dynamic" ? DynamicInputStyle : BasicInputStyle;
    return (
      <div
        className={`inline-block 
       
        ${style} ${className} ${rounded} ${padding}  bg-white px-8`}
      >
        <select
          ref={ref}
          {...props}
          className=" shadow-none outline-none focus-visible:ring-0 bg-white"
          disabled={isDisabled}
        >
          <option disabled value="" selected hidden>
            {placeholder ? placeholder : " Select Form"}
          </option>
          Username/Email   {options
            .filter((option) => option.label.toLowerCase() !== "image")
            .map((option, idx) => (
              <option value={option.value} key={idx}>
                {option.label}
              </option>
            ))}
        </select>
        {!!error && <Form.HelperText>{error}</Form.HelperText>}
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";

export { SelectInput };
