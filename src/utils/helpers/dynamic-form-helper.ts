import { UseFormSetValue } from "react-hook-form";
import { DynamicObjectType } from "../interfaces/common";

export const DynamicFormFields = [
  { label: "String", value: "StringField" },
  { label: "Integer Number", value: "IntegerField" },
  { label: "Decimal Number", value: "FloatField" },
  { label: "Boolean", value: "BooleanField" },
  { label: "Date", value: "DateField" },
  { label: "Date & Time", value: "DateTimeField" },
  { label: "Time", value: "TimeField" },
  { label: "Image", value: "ImageField" },
  // { label: "File", value: "FileField" },
  { label: "DropDown", value: "DropDown" },
];

const FieldTypes = {
  StringField: "text",
  IntegerField: "number",
  FloatField: "decimal",
  BooleanField: "boolean",
  DateField: "date",
  DateTimeField: "datetime-local",
  TimeField: "time",
  ImageField: "image",
  FileField: "file",
  DropDown: "dropDown",
};

export const generateType = (field: string | undefined) => {
  if (!field) return "text";
  //@ts-ignore
  return FieldTypes[field] || "text";
};

export const generateRequiredMessage = (
  fieldName: string,
  isRequired: boolean
) => {
  return isRequired
    ? {
        required: `${fieldName} is required.`,
      }
    : {};
};

export const dynamicValueSetter = (
  dynamicObject: DynamicObjectType,
  setValue: UseFormSetValue<any>
) => {
  Object.keys(dynamicObject).forEach((key) => {
    if (key.toLowerCase() === "id" || key.toLowerCase() === "_id") return;
    setValue(key, dynamicObject[key]);
  });
};
