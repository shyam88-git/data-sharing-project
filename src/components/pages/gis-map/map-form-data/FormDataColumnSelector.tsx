import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import Button from "../../../ui/button/Button";
import Form from "../../../ui/form/Form";
import CheckboxGroup from "../../../ui/form/reusable/CheckBoxGroup";
import { modifyKeyword } from "../../../../utils/helpers/validator";
import {
  AllDynamicFormDataResponseI,
  FilterFieldI,
} from "../../../../store/modules/dynamic-form/dynamicFormApi";

interface PropsI {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  errors: FieldErrors<any>;
  submitHandler: (data: any) => void;
  setIsSettingOpen(val: boolean): void;
  properties: AllDynamicFormDataResponseI | undefined;
  filterFieldList:
    | {
        fields: FilterFieldI[];
      }
    | undefined;
}

const FormDataColumnSelector = ({
  handleSubmit,
  submitHandler,
  errors,
  properties,
  register,
  setIsSettingOpen,
  filterFieldList,
}: PropsI) => {
  return (
    <>
      <div className="w-[76%]  ml-8  p-4 bg-slate-700 rounded-r-lg     rounded-br-lg">
        <h1 className="font-bold text-2xl">Choose properties column?</h1>

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.FormGroup>
            <CheckboxGroup
              name="dynamicColumn"
              error={
                errors?.dynamicColumn &&
                (errors.dynamicColumn.message as string)
              }
              options={
                properties?.results?.length
                  ? Object.keys(properties.results[0])
                      .filter(
                        (key) => !!key && key.toLowerCase() !== "feature_id"
                      )
                      .map((key) => {
                        const isFilterable = filterFieldList
                          ? !!filterFieldList.fields.find(
                              (field) => field.value === key
                            )
                          : false;

                        return {
                          label: `${modifyKeyword(key)}  ${
                            isFilterable ? " 🔰" : ""
                          }`,
                          value: modifyKeyword(key),
                        };
                      })
                  : [{ label: "No Options", value: "" }]
              }
              register={register}
            />
          </Form.FormGroup>
          <Button.Group margin="mt-4">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSettingOpen(false)}
            >
              Cancel
            </Button>
          </Button.Group>
        </Form>
      </div>
    </>
  );
};

export default FormDataColumnSelector;
