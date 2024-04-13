import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";
import Form from "../../../../components/ui/form/Form";
import GisFormLayout from "../../../../layouts/GisFormLayout";
import { FaAngleLeft } from "react-icons/fa6";
import {
  DynamicFormI,
  usePostDynamicFormMutation,
} from "../../../../store/modules/dynamic-form/dynamicFormApi";
import { useFieldArray, useForm } from "react-hook-form";
import { SelectInput } from "../../../../components/ui/form/reusable/SelectInput";
import { DynamicFormFields } from "../../../../utils/helpers/dynamic-form-helper";
import { IoMdAddCircleOutline } from "react-icons/io";
import BooleanCheckInput from "../../../../components/ui/form/reusable/BooleanCheckInput";
import { useEffect, useState } from "react";
import useToastHook from "../../../../utils/hooks/toast/useToastHook";
import { MdDelete } from "react-icons/md";
import SubFieldForm from "./SubFieldForm";
import Input from "../../../../components/ui/form/reusable/InputField";
import { TbRubberStampOff } from "react-icons/tb";
import { OptionValueI } from "./SubFieldForm";
import { useAppSelector } from "../../../../store/hook";

interface SelectFieldOptionsI {
  idx: number;
  options: OptionValueI[];
}

const intitialFormState: DynamicFormI = {
  name: "",
  gis_file: "",
  form_fields: [],
};

const DynamicForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToastHook();

  // STATE
  const { handleSubmit, control, register, reset } = useForm<DynamicFormI>({
    defaultValues: intitialFormState,
  });
  const [selectFieldOptions, setSelectFieldOptions] = useState<
    SelectFieldOptionsI[]
  >([]);
  const { fields, append, remove } = useFieldArray({
    name: "form_fields",
    control: control,
  });
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState<
    number[] | []
  >([]);

  // REDUX
  const activeGis = useAppSelector((store) => store.gisFile.activeGis);

  const [
    postDynamicForm,
    {
      isLoading: isPostFormLoading,
      isSuccess: isPostFormSuccess,
      isError: isPostFormError,
      error: postFormError,
    },
  ] = usePostDynamicFormMutation();

  // USEEFFECT
  useEffect(() => {
    if (isPostFormSuccess) {
      reset();
      showToast("Form submitted", { type: "success" });
      navigate("/forms");
    }
  }, [isPostFormSuccess]);

  useEffect(() => {
    if (isPostFormError) {
      // @ts-ignore
      const errors = postFormError?.data?.errors;

      errors?.length
        ? errors.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast("Something went wrond. Try again later", {
            type: "error",
          });
    }
  }, [isPostFormError]);

  // HELPER FUNCTION
  const onSubmitHandler = async (data: DynamicFormI) => {
    const payload = {
      ...data,
      gis_file: activeGis?.id || "",
      form_fields: data.form_fields.map((fields, idx) => {
        const matchingOptions = selectFieldOptions.find(
          (fieldOptions) => fieldOptions.idx === idx
        );

        return {
          ...fields,
          select_field: matchingOptions
            ? matchingOptions.options.filter((option) => option.value !== "")
            : null,
        };
      }),
    };

    // @ts-expect-error dynamic form post
    await postDynamicForm(payload);
  };

  const setOptionsHandler = (idx: number, data: any) => {
    const index = selectFieldOptions.findIndex((item) => item.idx === idx);

    if (index !== -1) {
      const updatedOptions = data.filter((option: any) => option.option !== "");
      setSelectFieldOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        newOptions[index] = { idx, options: updatedOptions };
        return newOptions;
      });
    } else {
      const newOptions = data.filter((option: any) => option.option !== "");
      setSelectFieldOptions((prevOptions) => [
        ...prevOptions,
        { idx, options: newOptions },
      ]);
    }
    // setValue(`form_fields.${idx}.select_field`, data);
  };

  return (
    <GisFormLayout>
      <Button.Group color="text-white" margin="my-4">
        <Button
          variant="focus"
          rounded="rounded-full"
          onClick={() => navigate("/forms")}
        >
          <FaAngleLeft size={20} /> Back
        </Button>
      </Button.Group>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.FormGroup isRow={true}>
          <Form.FormGroup otherStyles="pt-12 pl-10 pb-8 pr-56 w-full bg-white border-t-4 border-primary-blue-600">
            <Input
              placeholder="Form Name"
              name="name"
              register={register}
              required={TbRubberStampOff}
            />
          </Form.FormGroup>
          <Form.FormGroup otherStyles="bg-white w-full py-4 px-0 border-l-4 border-primary-blue-350">
            {fields.map((field, idx) => (
              <Form.FormGroup otherStyles="bg-primary-gray-80 px-16 gap-0">
                <Form.FormGroup
                  key={field.id}
                  otherStyles="items-center mb-0"
                  isRow={true}
                >
                  <Input
                    variant="dynamic"
                    placeholder="Form Field Name"
                    width="w-[100%] lg:w-[60%] "
                    className="rounded mb-[-22px]"
                    name={`form_fields.${idx}.name`}
                    register={register}
                  />{" "}
                  <SelectInput
                    variant="dynamic"
                    options={DynamicFormFields}
                    {...register(`form_fields.${idx}.form_type`)}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (e.target.value === "DropDown")
                        setSelectedDropdownIndex((prevState) => [
                          ...prevState,
                          idx,
                        ]);
                      else
                        setSelectedDropdownIndex((prevState) =>
                          prevState.filter((item) => item !== idx)
                        );
                    }}
                  />
                </Form.FormGroup>
                {/* @ts-ignore */}
                {selectedDropdownIndex.includes(idx) && (
                  <SubFieldForm index={idx} changeHandler={setOptionsHandler} />
                )}
                <Form.FormGroup
                  isRow={true}
                  otherStyles="items-center justify-between"
                >
                  <BooleanCheckInput
                    label="Required"
                    {...register(`form_fields.${idx}.required`)}
                  />
                  <MdDelete
                    className="cursor-pointer mr-8"
                    size={25}
                    onClick={() => remove(idx)}
                  />
                </Form.FormGroup>
              </Form.FormGroup>
            ))}
            <Form.FormGroup
              otherStyles={`w-full ${fields.length ? "justify-end" : "ml-8"} `}
              isRow={true}
            >
              <Button.Group margin="pt-8 mr-16" color="text-white">
                <Button
                  rounded="rounded-full"
                  variant="primary"
                  onClick={() => {
                    append({
                      name: "",
                      form_type: DynamicFormFields[0].value,
                      required: false,
                      select_field: null,
                    });
                  }}
                >
                  <IoMdAddCircleOutline size={18} /> Add
                </Button>
              </Button.Group>
            </Form.FormGroup>
          </Form.FormGroup>
        </Form.FormGroup>
        <Form.FormGroup>
          <Button.Group color="text-white">
            <Button
              isLoading={isPostFormLoading}
              rounded="rounded-full"
              type="submit"
              variant="focus"
            >
              <span className="text-lg font-normal leading 3xl"> Generate</span>
            </Button>
          </Button.Group>
        </Form.FormGroup>
      </Form>
    </GisFormLayout>
  );
};

export default DynamicForm;
