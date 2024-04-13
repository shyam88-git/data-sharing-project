import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GisFormLayout from "../../layouts/GisFormLayout";
import {
  useGetDynamicFormByIdQuery,
  useGetDynamicFormDataByIdQuery,
  useUpdateDynamicFormDataMutation,
} from "../../store/modules/dynamic-form/dynamicFormApi";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import Button from "../../components/ui/button/Button";
import { FaAngleLeft } from "react-icons/fa6";
import Form from "../../components/ui/form/Form";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import GetFormField from "./GetFormField";
import { isObject, validateNumberData } from "../../utils/helpers/validator";
import { dynamicValueSetter } from "../../utils/helpers/dynamic-form-helper";
import { useGetGisPropertiesQuery } from "../../store/modules/gis-file/gisFileApi";
import { useAppSelector } from "../../store/hook";

const DynamicFormUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("form_id");
  const { showToast } = useToastHook();

  // STATE
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<any>();

  const activeGis = useAppSelector((state) => state.gisFile.activeGis);
  // REDUX
  const { isLoading: isDynamicFormLoading, data: dynamicForm } =
    useGetDynamicFormByIdQuery({
      id: id || "",
    });
  const { isLoading: isDynamicFormData, data: dynamicFormData } =
    useGetDynamicFormDataByIdQuery({
      id: id || "",
      formId: formId || "",
    });

  const { data: propertyLists } = useGetGisPropertiesQuery({
    id: activeGis?.id.toString() || "",
    params: {
      search: "",
      page: 1,
      per_page: "1000",
    },
  });

  const [
    updateDynamicFormData,
    {
      isLoading: isUpdateFormLoading,
      isSuccess: isUpdateFormSuccess,
      isError: isUpdateFormError,
      error: updateFormError,
    },
  ] = useUpdateDynamicFormDataMutation();

  // USEEFFECT

  useEffect(() => {
    if (isObject(dynamicFormData)) {
      dynamicValueSetter(dynamicFormData, setValue);
    }
  }, [dynamicFormData]);

  useEffect(() => {
    if (isUpdateFormSuccess) {
      showToast("Form updated successfully", {
        type: "success",
      });
      reset();
      navigate(-1);
    }
  }, [isUpdateFormSuccess]);

  useEffect(() => {
    if (isUpdateFormError) {
      // @ts-ignore
      const errors = updateFormError?.data?.errors;

      errors?.length
        ? errors.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast("Something went wrong. Try agian later.", {
            type: "error",
          });
    }
  }, [isUpdateFormError]);

  // HELPER FUNCTION
  const onSubmitHandler = async (data: any) => {
    const payload = validateNumberData(data, dynamicForm?.form_fields ?? []);

    await updateDynamicFormData({
      id: id || "",
      formId: formId || "",

      data: { ...payload, property_id: propertyLists?.results?.[0]?._id || "" },
    });
  };

  if (isDynamicFormLoading || isDynamicFormData) return <LoadingSpinner />;

  return (
    <GisFormLayout>
      <Button.Group color="text-white" margin="my-4">
        <Button
          variant="focus"
          rounded="rounded-full"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft size={20} /> Back
        </Button>
      </Button.Group>

      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.FormGroup isRow={true}>
          <Form.FormGroup otherStyles="pt-12 pl-10 pb-8 pr-56 w-full bg-white border-t-4 border-primary-blue-600">
            {dynamicForm ? (
              <>
                <Form.FormGroup>
                  <h1 className="capitalize font-semi-bold text-2xl leading-3xl">
                    {dynamicForm?.name}
                  </h1>
                </Form.FormGroup>
                <Form.FormGroup otherStyles="!flex-row gap-8">
                  {dynamicForm?.form_fields.map((field, idx) => (
                    <GetFormField
                      key={idx}
                      field={field}
                      register={register}
                      errors={errors}
                    />
                  ))}
                </Form.FormGroup>
                <Form.FormGroup>
                  <Button.Group color="text-white">
                    <Button
                      isLoading={isUpdateFormLoading}
                      rounded="rounded-full"
                      type="submit"
                      variant="focus"
                    >
                      <span className="text-lg font-normal leading 3xl">
                        Update
                      </span>
                    </Button>
                  </Button.Group>
                </Form.FormGroup>
              </>
            ) : (
              "Currently NOT Available"
            )}
          </Form.FormGroup>
        </Form.FormGroup>
      </Form>
    </GisFormLayout>
  );
};

export default DynamicFormUpdatePage;
