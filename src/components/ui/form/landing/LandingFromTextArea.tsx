import React, { TextareaHTMLAttributes } from "react";
import Form from "../Form";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register?: any;
  value?: string;
}

const LandingFormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>((props, ref) => {
  const { name, placeholder, label, error, required = false, ...rest } = props;

  return (
    <Form.FormGroup>
      <Form.Label>
        {label} {required ? "*" : null}
      </Form.Label>
      <textarea
        className="border-b outline-none border-slate-200 border-solid bg-primary-blue-200 mt-6"
        placeholder={placeholder}
        name={name}
        ref={ref}
        {...rest}
      />
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
});

export default LandingFormTextArea;
