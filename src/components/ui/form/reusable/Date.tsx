import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface DateInputProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

const DateInput: React.FC<DateInputProps> = ({ label, name, register }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-black">{label}</label>
      <input
        type="date"
        {...register(name)}
        className="mt-1 p-2 h-14 w-[260px] font-normal leading-4xl border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default DateInput;
