import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { SelectTypeI } from "../../../../utils/interfaces/common";
import { UseFormSetValue } from "react-hook-form";

interface SelectPropsI {
  name: string;
  required?: boolean;
  width?: string;
  error?: string;
  placeholder?: string;
  rounded?: string;
  padding?: string;
  options: SelectTypeI[] | null;
  //   register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<any>;
  margin?: string;
  otherStyles?: string;
}

const DropDownSelector = ({
  placeholder,
  options,
  name,
  setValue,
}: SelectPropsI) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<SelectTypeI | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setValue(name, selected.value);
    }
  }, [selected]);

  return (
    <div className="w-72 font-medium  mb-8 relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-slate-800 w-full p-3 flex items-center justify-between rounded ${
          selected ? "text-white" : "text-slate-200"
        }`}
      >
        {selected
          ? selected?.label.length > 25
            ? selected?.label.substring(0, 25) + "..."
            : selected?.label
          : placeholder || "Select.."}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-slate-800  mt-2 overflow-y-auto overflow-x-hidden absolute  hidden-scrollbar w-72 z-[999999999] ${
          open ? "max-h-60  " : "max-h-0"
        } `}
      >
        <div className="px-2 sticky top-0 text-white bg-slate-800">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={`Enter to search`}
            className="w-full border-b border-solid bg-slate-800 placeholder:text-white p-2 outline-none"
          />
        </div>
        {options?.map((option, idx) => (
          <li
            key={idx}
            className={`p-3  text-base hover:bg-sky-600 text-slate-200 hover:text-white
            ${
              option?.value?.toLowerCase() === selected?.value.toLowerCase() &&
              "bg-sky-700 text-white"
            }
            ${
              option?.label?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (
                option?.value?.toLowerCase() !== selected?.value.toLowerCase()
              ) {
                setSelected(option);
                setInputValue("");
              }
              setOpen(false);
            }}
          >
            {option?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownSelector;
