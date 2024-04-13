import { useForm } from "react-hook-form";
import CheckboxGroup from "../ui/form/reusable/CheckBoxGroup";
import Form from "../ui/form/Form";
import { modifyKeyword } from "../../utils/helpers/validator";
import Button from "../ui/button/Button";
import { dynamicColumnSelectErrorGenerator } from "../../utils/helpers/generator";
import {
  DynamicObjectType,
  StringArrayType,
} from "../../utils/interfaces/common";
import { useEffect } from "react";

interface PropsI {
  title: string;
  setIsSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDynamicColumns: React.Dispatch<React.SetStateAction<StringArrayType>>;
  dynamicData: DynamicObjectType;
  ignoreColumn?: StringArrayType;
  initialColumn?: StringArrayType;
}

const DynamicColumnSelector = ({
  title,
  setIsSelectorOpen,
  setDynamicColumns,
  dynamicData,
  ignoreColumn,
  initialColumn,
}: PropsI) => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<any>({});
  const submitHandler = (data: any) => {
    useEffect(() => {
      if (initialColumn) {
        setValue("dynamicColumn", initialColumn);
      }
    }, []);

    if (data?.dynamicColumn) {
      if (!dynamicColumnSelectErrorGenerator(data.dynamicColumn, setError)) {
        setDynamicColumns(data.dynamicColumn);
        setIsSelectorOpen(false);
      }
    }
  };
  return (
    <div>
      {" "}
      <h1 className="font-bold text-2xl">{title}</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.FormGroup>
          <CheckboxGroup
            name="dynamicColumn"
            error={
              errors?.dynamicColumn && (errors.dynamicColumn.message as string)
            }
            options={
              dynamicData
                ? Object.keys(dynamicData)
                    .filter(
                      (key) =>
                        !!key &&
                        (ignoreColumn
                          ? !ignoreColumn
                              .join("^")
                              .toLowerCase()
                              .split("^")
                              .includes(key.toLowerCase())
                          : true)
                    )
                    .map((key) => {
                      return {
                        label: modifyKeyword(key),
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
            onClick={() => setIsSelectorOpen(false)}
          >
            Cancel
          </Button>
        </Button.Group>
      </Form>
    </div>
  );
};

export default DynamicColumnSelector;
