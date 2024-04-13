import React, { InputHTMLAttributes } from "react";
import Form from "../Form";

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;

  register?: any;
  ref?: any;
}

const BooleanCheckInput = React.forwardRef<
  HTMLInputElement,
  CustomCheckboxProps
>(({ label, error, ...rest }, ref) => {
  return (
    <Form.FormGroup>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="w-3 h-3 rounded-full mr-2 cursor-pointer"
          ref={ref}
          {...rest}
        />
        <span className="text-primary-blue-900 text-base font-normal leading-3xl">
          {label}
        </span>
      </label>
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
});

export default BooleanCheckInput;
