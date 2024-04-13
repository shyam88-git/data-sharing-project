import DropDown from "../../../ui/form/reusable/DropDown";
import { UseFormRegister } from "react-hook-form";
import Button from "../../../ui/button/Button";
import { FilterFieldI } from "../../../../store/modules/dynamic-form/dynamicFormApi";
import { modifyKeyword } from "../../../../utils/helpers/validator";

interface PropsI {
  fields: FilterFieldI[];
  register: UseFormRegister<any>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function FeatureFormDataFilter({
  currentIndex,
  register,
  fields,
  setCurrentIndex,
}: PropsI) {
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fields.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? fields.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="w-full overflow-hidden relative my-5 ">
      <div className=" flex transition ease-out duration-40 ">
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <DropDown
              label={field.label}
              name={field.value}
              width="w-[400px]"
              margin=" ml-2 mr-14"
              otherStyles="text-primary-blue-900"
              options={field.options.map((option) => ({
                label: modifyKeyword(option.value),
                value: option.value,
              }))}
              register={register}
            />
          </div>
        ))}
      </div>

      <div className="relative pb-4 flex justify-center gap-3 w-full">
        {fields.map((_, i) => (
          <div
            onClick={() => {
              setCurrentIndex(i);
            }}
            key={"circle" + i}
            className={`rounded-full w-5 h-5 cursor-pointer  ${
              i === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>

      <div className="relative h-full w-full justify-end gap-2 items-center flex   ">
        <Button
          variant="ghost"
          isDisabled={currentIndex < 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        {currentIndex === fields.length - 1 ? (
          <Button type="submit" variant="primary">
            Filter
          </Button>
        ) : (
          <Button variant="ghost" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
