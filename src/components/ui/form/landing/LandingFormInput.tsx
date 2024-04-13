import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import Form from "../Form";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name?: string;
  label: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  register?: any;
  ref?: any;
  bgColor?: string;
  value?: string;
}

const LandingFormInput = React.forwardRef<
  HTMLInputElement,
  CustomInputProps & HTMLAttributes<HTMLInputElement>
>(
  (
    {
      name,
      placeholder,
      bgColor = "bg-primary-blue-200",
      type,
      label,
      error,
      required = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Form.FormGroup>
        <Form.Label>
          {label} {required ? "*" : null}
        </Form.Label>
        <input
          type={type || "text"}
          className={`border-b outline-none border-slate-200 border-solid ${bgColor}`}
          placeholder={placeholder}
          name={name}
          ref={ref}
          {...rest}
        />
        {!!error && <Form.HelperText>{error}</Form.HelperText>}
      </Form.FormGroup>
    );
  }
);

export default LandingFormInput;
