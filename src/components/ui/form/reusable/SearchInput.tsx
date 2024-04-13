import React from "react";
import Form from "../Form";
import { DynamicInputStyle } from "./common-style";
import { IoSearchSharp } from "react-icons/io5";

interface CustomInputProps {
  type?: string;
  name: string;
  placeholder?: string;
  error?: string;
  rounded?: string;
  padding?: string;
  width?: string;
  ref?: any;
  extraClassName?: string;
  className?: string;
  onChange: (value: string) => void; // Updated onChange type
}

const SearchInput: React.FC<CustomInputProps> = ({
  name,
  placeholder = "Search here...",
  type,
  error,
  className,
  rounded = "rounded",
  padding = "py-3 px-6",
  width,
  onChange,
  extraClassName,
  ...rest
}) => {
  const changeHandler = (keyword: string) => {
    onChange(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeHandler(e.currentTarget.value);
    }
  };

  return (
    <Form.FormGroup otherStyles={`${width} mb-1 ${extraClassName} `}>
      <IoSearchSharp
        size={20}
        className="absolute top-4 left-4 text-primary-gray-200"
      />
      <input
        type={type || "text"}
        name={name}
        className={`
          shadow-none outline-none focus-visible:ring-0 h-12
          ${DynamicInputStyle} ${rounded} ${padding} ${className} pl-12 text-primary-gray-300 text-lg
        `}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default SearchInput;
