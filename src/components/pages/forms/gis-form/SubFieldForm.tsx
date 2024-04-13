import { useFieldArray, useForm } from "react-hook-form";
import Form from "../../../../components/ui/form/Form";
import { MdOutlineClose } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../../../../components/ui/button/Button";

import { FaRegCircle } from "react-icons/fa6";
import { generateRequiredMessage } from "../../../../utils/helpers/dynamic-form-helper";
import { BasicInputStyle } from "../../../../components/ui/form/reusable/common-style";

export interface OptionValueI {
  value: string;
}

interface PropsI {
  changeHandler: (idx: number, data: any) => void;
  index: number;
}

const SubFieldForm = ({ changeHandler, index }: PropsI) => {
  const { control, register, getValues } = useForm<{ options: OptionValueI[] }>(
    {
      defaultValues: { options: [] },
    }
  );
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: control,
  });

  const onChangeHandler = () => {
    const opionsValue = getValues("options");

    changeHandler(index, opionsValue);
  };
  return (
    <>
      <Form.FormGroup otherStyles="px-8 my-0">
        <Form.FormGroup>
          {fields.map((field, idx) => (
            <Form.FormGroup
              key={field.id}
              isRow={true}
              otherStyles="items-center my-0 mb-0"
            >
              <FaRegCircle size={25} />
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                className={`shadow-none outline-none focus-visible:ring-0 ${BasicInputStyle} rounded text-sm bg-transparent py-1 px-0`}
                style={{ width: "50%" }}
                {...register(
                  `options.${idx}.value`,
                  generateRequiredMessage("This field ", false)
                )}
                onChange={() => {
                  onChangeHandler();
                }}
              />
              <MdOutlineClose
                size={30}
                onClick={() => {
                  remove(idx as number);
                  onChangeHandler();
                }}
                className="cursor-pointer pt-2 ml-4 text-primary-danger"
              />
            </Form.FormGroup>
          ))}
          <Button.Group color="text-primary-blue-300">
            <Button
              variant="ghost"
              onClick={() => {
                append({ value: "" });
                onChangeHandler();
              }}
            >
              <IoMdAddCircleOutline size={20} /> Add option
            </Button>
          </Button.Group>
        </Form.FormGroup>
      </Form.FormGroup>
    </>
  );
};

export default SubFieldForm;
