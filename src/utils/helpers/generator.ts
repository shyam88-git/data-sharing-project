import { UseFormSetError } from "react-hook-form";
import { DynamicObjectType, StringArrayType } from "../interfaces/common";
import { modifyKeyword } from "./validator";

/* 
Object.keys(data.results[0]).forEach((key) => {
  if (key.toLowerCase() !== "_id" && key.toLowerCase() !== "id") {
    const snIndex = tableColumns.indexOf("S.N");
    const actionIndex = tableColumns.length - 1;
    setTableColumns((prevState) => [
      ...prevState.slice(0, snIndex + 1),
      modifyKeyword(key),
      ...prevState.slice(actionIndex),
    ]);
  }
}); */

export const columnGenerator = () => {};

export const tableHeaderColumnGenerator = (
  initialArray: StringArrayType,
  dynamicObject: DynamicObjectType,
  index?: number
) => {
  let workingArray = initialArray;
  const insertIndex = !!index ? index : -1;

  const dynamicObjectArray = Object.keys(dynamicObject);

  dynamicObjectArray.forEach((key, idx) => {
    if (key.toLowerCase() !== "_id" && key.toLowerCase() !== "id" && idx <= 4) {
      const insertKeyword = modifyKeyword(key);
      workingArray.splice(insertIndex, 0, insertKeyword);
    }
  });

  return workingArray;
};

export const dynamicColumnSelectErrorGenerator = (
  dynamicColumn: string[],
  setError: UseFormSetError<any>,
  min = 3,
  max = 5
) => {
  if (dynamicColumn.length < min) {
    setError("dynamicColumn", {
      type: "manual",
      message: `Must select atleast ${min} options.`,
    });
    return true;
  } else if (dynamicColumn.length > max) {
    setError("dynamicColumn", {
      type: "manual",
      message: `Must select atmost ${max} options`,
    });
    return true;
  }
  return false;
};
