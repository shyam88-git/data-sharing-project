import { useNavigate, useParams } from "react-router-dom";
import GisFormLayout from "../../layouts/GisFormLayout";
import {
  useAddDynamicFormDataMutation,
  useGetDynamicFormByIdQuery,
} from "../../store/modules/dynamic-form/dynamicFormApi";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import Button from "../../components/ui/button/Button";
import { FaAngleLeft } from "react-icons/fa6";
import Form from "../../components/ui/form/Form";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import GetFormField from "./GetFormField";
import {
  notEmptyObject,
  validateDateData,
  validateNumberData,
} from "../../utils/helpers/validator";
import { useGetGisPropertiesQuery } from "../../store/modules/gis-file/gisFileApi";
import { useAppSelector } from "../../store/hook";
import { SelectInput } from "../../components/ui/form/reusable/SelectInput";

const DynamicFormPage = () => {
  const { id } = useParams();
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  // STATE
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<any>();

  // REDUX
  const activeGis = useAppSelector((state) => state.gisFile.activeGis);
  const { isLoading, data: dynamicFormData } = useGetDynamicFormByIdQuery({
    id: id || "",
  });
  const { data: propertyLists, isLoading: isGetPropertiesLoading } =
    useGetGisPropertiesQuery({
      id: activeGis?.id.toString() || "",
      params: {
        search: "",
        page: 1,
        per_page: "1000",
      },
    });
  const [
    addDynamicFormData,
    {
      isLoading: isAddFormLoading,
      isSuccess: isAddFormSuccess,
      isError: isAddFormError,
      error: addFormError,
    },
  ] = useAddDynamicFormDataMutation();

  // USEEFFECT
  useEffect(() => {
    if (isAddFormSuccess) {
      showToast("Form submitted successfully", {
        type: "success",
      });
      reset();
      navigate(-1);
    }
  }, [isAddFormSuccess]);

  useEffect(() => {
    if (isAddFormError) {
      //@ts-ignore
      const errors = addFormError?.data?.errors;

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
  }, [isAddFormError]);

  // HELPER FUNCTION

  const onSubmitHandler = async (data: any) => {
    const payload = validateDateData(
      validateNumberData(data, dynamicFormData?.form_fields ?? []),
      dynamicFormData?.form_fields ?? []
    );
    await addDynamicFormData({
      id: dynamicFormData?.id || "",
      data: payload,
    });
  };

  if (isLoading || isGetPropertiesLoading) return <LoadingSpinner />;

  return (
    <GisFormLayout>
      <div className="2xl:w-[80%] mx-auto">
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
              {dynamicFormData ? (
                <>
                  <Form.FormGroup
                    isRow={true}
                    otherStyles="justify-between w-full"
                  >
                    <h1 className="capitalize font-semi-bold text-2xl leading-3xl">
                      {dynamicFormData?.name}
                    </h1>
                    <SelectInput
                      placeholder="Select properties"
                      variant="dynamic"
                      options={
                        propertyLists?.results.length
                          ? propertyLists?.results?.map((property: any) => {
                              const keys: string[] = Object.keys(property);
                              const firstKey: string = keys[1].toString();
                              const secondKey: string = keys[2].toString();
                              return {
                                label: `${property[firstKey] || "Null"} - ${
                                  property[secondKey] || "Null"
                                }` as string,
                                value: (property?._id ||
                                  property?.id) as string,
                              };
                            })
                          : [{ label: "No option", value: "" }]
                      }
                      {...register(`property_id`, {
                        required: "Please select property",
                      })}
                      error={
                        (notEmptyObject(errors) &&
                          (errors?.property_id?.message as string)) ||
                        ""
                      }
                    />
                  </Form.FormGroup>
                  <Form.FormGroup otherStyles="!flex-row gap-8">
                    {dynamicFormData?.form_fields.map((field, idx) => (
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
                        isLoading={isAddFormLoading}
                        rounded="rounded-full"
                        type="submit"
                        variant="focus"
                      >
                        <span className="text-lg font-normal leading 3xl">
                          Submit
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
      </div>
    </GisFormLayout>
  );
};

export default DynamicFormPage;
