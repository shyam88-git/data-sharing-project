import { DynamicFormFieldI } from "../../store/modules/dynamic-form/dynamicFormApi";
import { DynamicObjectType } from "../interfaces/common";
import { generateType } from "./dynamic-form-helper";
import moment from "moment-timezone";

export const makeKeyword = (name: string) => {
  return name.toLowerCase().split(" ").join("_");
};

export const modifyKeyword = (name: string) => {
  return name.split("_").join(" ");
};

export function isObject(obj: any) {
  return typeof obj === "object" && obj !== null;
}

export function notEmptyObject(obj: DynamicObjectType) {
  return !!Object.keys(obj).length;
}

export const checkIntegerType = (
  key: string,
  value: any,
  types: DynamicFormFieldI[]
) => {
  const type = types.find((type) => makeKeyword(type.name) === key);
  const typeFormType = generateType(type?.form_type);

  if (typeFormType === "number" || typeFormType === "decimal") {
    if (typeof value !== "number" ) {
      return parseFloat(value);
    }
  } else if (typeFormType === "boolean") {
    
    if (typeof value === "string") {
      return value.toLowerCase() === "true";
    }
  }

  return value;
};

export const formatDate = (value: string) => {
  const dateObject: Date = new Date(value);

  const formattedDate: string = `${dateObject.getFullYear()}/${(
    "0" +
    (dateObject.getMonth() + 1)
  ).slice(-2)}/${("0" + dateObject.getDate()).slice(-2)}`;
  return formattedDate;
};

export const formatDateTime = (value: string) => {
  const dateObject: Date = new Date(value);

  const formattedDate: string = `${dateObject.getFullYear()}/${(
    "0" +
    (dateObject.getMonth() + 1)
  ).slice(-2)}/${("0" + dateObject.getDate()).slice(-2)} ${(
    "0" + dateObject.getHours()
  ).slice(-2)}:${("0" + dateObject.getMinutes()).slice(-2)}:${(
    "0" + dateObject.getSeconds()
  ).slice(-2)}`;
  return formattedDate;
};
export const formatTime = (value: string) => {
  const currentDate = moment(value, "hh:mm:ss");

  const hours = currentDate.hours();
  const minutes = currentDate.minutes();
  const seconds = currentDate.seconds();

  const formatedDateSetting = `${hours}:${minutes}:${seconds}`;
  console.log(formatedDateSetting);
  return formatedDateSetting;
}

const checkDateType = (key: string, value: any, types: DynamicFormFieldI[]) => {
  const type = types.find((type) => makeKeyword(type.name) === key);
  const modifiedValue =
    generateType(type?.form_type) === "date"
      ? formatDate(value)
      : generateType(type?.form_type) === "datetime-local"
      ? formatDateTime(value)
      : generateType(type?.form_type)==='time'?formatTime(value):value
  return modifiedValue;
};
export const validateNumberData = (data: any, types: DynamicFormFieldI[]) => {
  Object.keys(data).forEach((key) => {
    data[key] = checkIntegerType(key, data[key], types);
    
    
  });
  return data;
};

export const validateDateData = (data: any, types: DynamicFormFieldI[]) => {
  Object.keys(data).forEach((key) => {
    data[key] = checkDateType(key, data[key], types);
    
  });
  return data;
};
