import React, { HTMLAttributes } from "react";

interface FormPropsI extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = (props: FormPropsI) => {
  return (
    <form onSubmit={props.onSubmit} className="my-6">
      {props.children}
    </form>
  );
};

interface FormFormGroupPropsI extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isRow?: boolean;
  error?: boolean;
  otherStyles?: string;
}

Form.FormGroup = function FormFormGroup({
  error,
  isRow,
  otherStyles,
  ...props
}: FormFormGroupPropsI) {
  return (
    <div
      className={`relative ${error ? "form-error" : ""} p-0 flex text-sm ${
        isRow ? "flex-row gap-4 items-end" : "flex-col gap-0 items-stretch mb-2"
      } flex-wrap  mb-6 ${otherStyles}`}
      {...props}
    />
  );
};

interface FormLabelPropsI extends React.LabelHTMLAttributes<HTMLLabelElement> {
  for?: string;
}

Form.Label = function FormLabel(props: FormLabelPropsI) {
  return (
    <label
      {...props}
      className="mb-2 inline-block text-lg leading-3xl font-semibold capitalize"
    />
  );
};

interface FormHelperTextPropsI {
  children: React.ReactNode;
  color?: string;
  otherStyles?: string;
}

Form.HelperText = function FormHelperText(props: FormHelperTextPropsI) {
  const { color, otherStyles, ...rest } = props;
  return (
    <p
      {...rest}
      className={`text-xs mt-1 text-red-800 tracking-[1.5px] text-shadow-err absolute bottom-[-18px] ${otherStyles} ${color}`}
    />
  );
};

export default Form;
