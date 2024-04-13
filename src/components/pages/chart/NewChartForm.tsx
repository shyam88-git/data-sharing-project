import { useForm } from "react-hook-form";
import Form from "../../ui/form/Form";
import DropDownSelector from "../../ui/form/reusable/DropDownSelector";
import Button from "../../ui/button/Button";
import { useEffect, useState } from "react";
import {
  ChartTypes,
  OperationTypes,
} from "../../../utils/interfaces/chart-type";
import FadeInOutWrapper from "../../ui/wrapper/FadeInOutWrapper";
import {
  ChartAttibuteI,
  ChartFormAndFieldsI,
  CreateChartFormI,
  useCreateChartMutation,
} from "../../../store/modules/chart/chartApi";
import useToastHook from "../../../utils/hooks/toast/useToastHook";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/form/reusable/InputField";

interface PropsI {
  formList: ChartFormAndFieldsI[] | [];
  gisId: string;
}

const NewChartForm = ({ formList, gisId }: PropsI) => {
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  // STATE
  const formState = useForm<CreateChartFormI>({
    defaultValues: {
      form: "",
      form_field: "",
      title: "",
      operation: "",
      chart: "",
    },
  });
  const [showChartType, setShowChartType] = useState<boolean>(false);
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const [attributes, setAttibutes] = useState<ChartAttibuteI[] | null>(null);

  const formListSelectWatch = formState.watch("form");
  const chartTypeWatch = formState.watch("chart");

  // REDUX
  const [createChart, { isLoading, isError, error, isSuccess }] =
    useCreateChartMutation();

  // USE EFFECT
  useEffect(() => {
    if (formListSelectWatch) {
      const matchedAttributes: ChartAttibuteI[] | null =
        formList.find(
          (formEl) => formEl.form.value === formState.getValues("form")
        )?.attributes || null;
      setAttibutes(matchedAttributes);
      setShowChartType(true);
    } else setShowChartType(false);
  }, [formListSelectWatch]);
  useEffect(() => {
    if (chartTypeWatch) {
      setShowSubCategory(true);
    } else setShowSubCategory(false);
  }, [chartTypeWatch]);

  useEffect(() => {
    if (isSuccess) {
      formState.reset();
      showToast("Created Chart.", { type: "success" });
      navigate("/chart?charts=show-all");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      //@ts-ignore
      const errorList = error?.data?.errors;
      errorList?.length
        ? errorList.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast("Something went wrong. Try agian later.", {
            type: "error",
          });
    }
  }, [isError]);

  // HELPER FUNCTION
  const submitHandler = (values: any) => {
    const payload = { ...values, gis_file: gisId };
    createChart(payload);
  };
  return (
    <>
      <div className="-my-6">
        <Form onSubmit={formState.handleSubmit(submitHandler)}>
          <h1 className="font-extrabold text-2xl mb-2">Chart Category</h1>
          <Form.FormGroup otherStyles="-mb-3" isRow={true}>
            <Form.FormGroup>
              <Form.Label>Form</Form.Label>
              <DropDownSelector
                name="form"
                options={
                  formList.length
                    ? formList.map((form) => {
                        return {
                          label: form.form.label || "",
                          value: form.form.value || "",
                        };
                      })
                    : [{ label: "No form", value: "" }]
                }
                setValue={formState.setValue}
              />
            </Form.FormGroup>
            <FadeInOutWrapper showEl={!!showChartType}>
              <Form.FormGroup>
                <Form.Label>Chart Type</Form.Label>
                <DropDownSelector
                  name="chart"
                  options={ChartTypes}
                  setValue={formState.setValue}
                />
              </Form.FormGroup>
            </FadeInOutWrapper>
          </Form.FormGroup>
          <FadeInOutWrapper showEl={showSubCategory} otherClassName="!px-0">
            <h1 className="font-extrabold text-2xl mb-4 ">Sub Category</h1>
          </FadeInOutWrapper>
          {showSubCategory && (
            <Form.FormGroup isRow={true}>
              {attributes ? (
                <Form.FormGroup>
                  <Form.Label>Column</Form.Label>
                  <DropDownSelector
                    name="form_field"
                    options={attributes}
                    setValue={formState.setValue}
                  />
                </Form.FormGroup>
              ) : (
                <>
                  <h1 className="bg-sky-800 text-white py-3 px-6 cursor-not-allowed">
                    Sub Category NOT available.
                  </h1>
                </>
              )}
              <Form.FormGroup otherStyles="mb-8">
                <Input
                  variant="dynamic"
                  padding="!p-2"
                  label="Title"
                  name="title"
                  className="bg-slate-800 text-white text-base"
                  placeholder="Title here"
                  extraClassName="mb-5"
                  register={formState.register}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>Operation</Form.Label>
                <DropDownSelector
                  name="operation"
                  options={OperationTypes}
                  setValue={formState.setValue}
                />
              </Form.FormGroup>
            </Form.FormGroup>
          )}
          <Button.Group color="text-white">
            <Button type="submit" variant="focus" isLoading={isLoading}>
              Generate
            </Button>
          </Button.Group>
        </Form>
      </div>
    </>
  );
};

export default NewChartForm;
