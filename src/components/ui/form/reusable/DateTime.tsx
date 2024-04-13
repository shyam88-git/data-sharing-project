import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface DateTimeInputProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  name,
  register,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type="datetime-local"
        {...register(name)}
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default DateTimeInput;
