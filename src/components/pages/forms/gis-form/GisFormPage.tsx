import Button from "../../../../components/ui/button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiFileListLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import GisFormLayout from "../../../../layouts/GisFormLayout";
import {
  DynamicFormI,
  useDeleteDynamicFormMutation,
} from "../../../../store/modules/dynamic-form/dynamicFormApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import useToastHook from "../../../../utils/hooks/toast/useToastHook";
import ConfirmPopup from "../../../../components/popup/ConfirmPopup";

interface GisFormPropsI {
  formData: DynamicFormI[];
}

const GisFormPage = ({ formData }: GisFormPropsI) => {
  const navigate = useNavigate();
  const { showToast } = useToastHook();

  //STATE
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [selectedFormId, setSelectedFormId] = useState<string>("");

  // REDUX
  const [
    deleteDynamicForm,
    {
      isLoading: isDeleteFormLoading,
      isSuccess: isDeleteFormSuccess,
      isError: isDeleteFormError,
      error: deleteFormError,
    },
  ] = useDeleteDynamicFormMutation();

  // USEEFFECT
  useEffect(() => {
    if (isDeleteFormSuccess) {
      showToast("Form delete successfully", {
        type: "success",
      });
      setOpenConfirmModal(false);
    }
  }, [isDeleteFormSuccess]);

  useEffect(() => {
    if (isDeleteFormError) {
      // @ts-ignore
      const errors = deleteFormError?.data?.errors;

      errors?.length
        ? errors.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast("Something went wrong. Try agian later.", {
            type: "error",
          });
      setOpenConfirmModal(false);
    }
  }, [isDeleteFormError]);

  // HELPER FUNCTION
  const closePopupHandler = () => {
    setOpenConfirmModal(false);
  };
  const confirmPopupHandler = async () => {
    await deleteDynamicForm({ id: selectedFormId });
  };

  return (
    <GisFormLayout>
      <div className="h-[742px] flex gap-3 mt-10">
        <div className="h-full min-w-[460px] bg-white py-12 flex flex-col items-center ">
          <Button.Group margin="mb-12">
            <Button
              rounded="rounded-full"
              color="text-white"
              variant="primary"
              onClick={() => {
                navigate("/forms/create");
              }}
            >
              <IoMdAddCircleOutline size={20} /> Create New Form
            </Button>
          </Button.Group>
          <div className="p-4  shadow-xl overflow-hidden">
            <p className="font-semibold leading-3xl text-xl mb-4">Form List</p>
            <div className="border-b-2 border-primary-gray-180 mb-6"></div>
            <div className="overflow-auto h-[600px] h-full hidden-scrollbar w-full p-4">
              {formData?.map((form, idx) => (
                <div className="flex items-center gap-3">
                  <div
                    key={idx}
                    className="w-[280px] bg-primary-gray-120 px-4 py-3 mb-2 rounded-md text-primary-gray-800 flex justify-between items-center cursor-pointer hover:bg-primary-gray-150"
                    onClick={() => {
                      navigate(
                        `/forms/${form.id}/?title=${form.name
                          .split(" ")
                          .join("-")}`
                      );
                    }}
                  >
                    <span className="font-normal leading-xl capitalize">
                      {" "}
                      {form.name}
                    </span>{" "}
                    <RiFileListLine size={22} />
                  </div>
                  <MdEdit
                    size={20}
                    title="Edit"
                    className="text-primary-blue-600 cursor-pointer"
                    onClick={() => {
                      navigate(`/forms/update/${form?.id}`);
                    }}
                  />
                  <RiDeleteBin6Line
                    size={20}
                    className="text-primary-danger-950 cursor-pointer"
                    title="Delete"
                    onClick={() => {
                      setSelectedFormId(form?.id as string);
                      setOpenConfirmModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[url('/globe-mapping.png')]  h-full bg-contain  relative  flex items-center">
          <img src="/globe-mapping-layer.png" className="w-full  h-full" />
          <div className="text-center absolute  left-[25%] text-white">
            <p className="font-normal leading-[56px] text-2xl">
              Map Your Success: Fast-Track Analysis <br /> with{" "}
            </p>
            <p className="font-extrabold text-4xl">GIS Forms</p>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isLoading={isDeleteFormLoading}
        onClose={closePopupHandler}
        showModal={openConfirmModal}
        onConfirm={confirmPopupHandler}
        message=" Deleting this form will result in the loss of all associated data. Are you sure you want to proceed with the deletion?"
      />
    </GisFormLayout>
  );
};

export default GisFormPage;
