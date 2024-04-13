import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { DynamicFormFieldI } from "../../store/modules/dynamic-form/dynamicFormApi";
import { generateType } from "../../utils/helpers/dynamic-form-helper";
import DropDown from "../../components/ui/form/reusable/DropDown";
import Input from "../../components/ui/form/reusable/InputField";
import ImageUpload from "../../components/ui/form/reusable/ImageUpload";
import FileUpload from "../../components/ui/form/reusable/FileUpload";
import RadioInput from "../../components/ui/form/reusable/RadioInput";
import {
  isObject,
  makeKeyword,
  notEmptyObject,
} from "../../utils/helpers/validator";

interface PropsI {
  field: DynamicFormFieldI;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<any>;
}

const GetFormField = ({ field, register, errors }: PropsI) => {
  const inputWidth = "w-[390px]";
  const type = generateType(field.form_type);
  if (type === "text")
    return (
      <Input
        variant="dynamic"
        label={field.name}
        type="text"
        width={inputWidth}
        error={
          ((isObject(errors) &&
            notEmptyObject(errors as object) &&
            // @ts-ignore
            errors[makeKeyword(field.name)]?.message) as string) || ""
        }
        required={field.required}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  if (type === "number")
    return (
      <Input
        variant="dynamic"
        label={field.name}
        type="number"
        width={inputWidth}
        required={field.required}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  if (type === "decimal")
    return (
      <Input
        variant="dynamic"
        label={field.name}
        type="number"
        width={inputWidth}
        required={field.required}
        name={makeKeyword(field.name)}
        register={register}
        step="any"
      />
    );
  if (type === "time" || type === "date" || type === "datetime-local") {
    return (
      <Input
        variant="dynamic"
        label={field.name}
        type={type}
        width={inputWidth}
        required={field.required}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  }

  if (type === "dropDown") {
    const options = !!field
      ? field?.select_field?.map((field) => ({
          label: field.value,
          value: field.value,
        }))
      : null;
    return (
      <DropDown
        label={field.name}
        name={makeKeyword(field.name)}
        options={options || null}
        padding="!px-2"
        register={register}
      />
    );
  }

  if (type === "boolean") {
    return (
      <RadioInput
        label={field.name}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  }

  if (type === "image") {
    return (
      <ImageUpload
        label={field.name}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  }
  if (type === "file") {
    return (
      <FileUpload
        label={field.name}
        name={makeKeyword(field.name)}
        register={register}
      />
    );
  }
  return (
    <>
      <h1>Name; {field.name} </h1> -{}
    </>
  );
};

export default GetFormField;
