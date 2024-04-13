import React, { useEffect, useState } from "react";
import Form from "../../ui/form/Form";
import FileUpload from "../../ui/form/reusable/FileUpload";
import { useForm } from "react-hook-form";
import Button from "../../ui/button/Button";
import Input from "../../ui/form/reusable/InputField";
import {
  GisFileI,
  usePostGisFileMutation,
  useUpdateGisFileMutation,
} from "../../../store/modules/gis-file/gisFileApi";
import useToastHook from "../../../utils/hooks/toast/useToastHook";
import { notEmptyObject } from "../../../utils/helpers/validator";
import { getAllGisFile } from "../../../store/modules/gis-file/gisFileSlice";
import { useAppDispatch } from "../../../store/hook";

interface PropsI {
  setIsUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
  selectUpdateGis: GisFileI | null;
}

const UploadGisFile = ({ setIsUploadFile, selectUpdateGis }: PropsI) => {
  const { showToast } = useToastHook();
  const dispatch = useAppDispatch();

  // STATE
  const { handleSubmit, register, setValue, reset } = useForm<{
    name: String;
    file: any;
  }>({
    defaultValues: {
      name: "",
      file: null,
    },
  });
  const [file, setFile] = useState<File | null>(null);

  // REDUX
  const [postGisFile, { isLoading, isError, error, isSuccess }] =
    usePostGisFileMutation();
  const [
    updateGisFile,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateGisFileMutation();

  // USEEFFECT
  useEffect(() => {
    if (selectUpdateGis && notEmptyObject(selectUpdateGis)) {
      setValue("name", selectUpdateGis.name);
    }
  }, [selectUpdateGis]);
  useEffect(() => {
    if (isSuccess) {
      GetGisFile();
      showToast(`File Uploaded sucessfully.`, { type: "success" });
      reset();
      setIsUploadFile(false);
    } else if (isUpdateSuccess) {
      GetGisFile();
      showToast(`File updated sucessfully.`, { type: "success" });
      reset();
      setIsUploadFile(false);
    }
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    let errors = null;
    if (isError) {
      // @ts-ignore
      errors = error?.data?.errors;
      errors?.length
        ? errors.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast("Something went wrong. Try again later", {
            type: "error",
          });
    } else if (isUpdateError) {
      // @ts-ignore
      errors = updateError?.data?.errors;
      errors?.length
        ? errors.forEach((error: any) => {
            showToast(`${error?.message}`, {
              type: "error",
            });
          })
        : showToast(
            "🛠 **Api Update:** We are currently experiencing hiccups with this API, but don't worry! We are working hard to fix it. Your experience is important to us, and we appreciate your patience. It will be normal soon. Thank you for understanding! 🙏",
            { type: "info" }
          );
      // showToast("Something went wrond. Try again later", {
      //     type: "error",
      //   });
    }
  }, [isError, isUpdateError]);

  // HELPER FUNCTION
  const GetGisFile = async () => {
    await dispatch(
      getAllGisFile({
        params: {
          search: "",
          page: 1,
          per_page: 10,
        },
      })
    );
  };

  const submitHandler = async (data: any) => {
    const { name } = data;
    if (name && file) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      if (selectUpdateGis) {
        await updateGisFile({
          id: selectUpdateGis.id.toString(),
          data: formData,
        });
      } else await postGisFile(formData);
    } else {
      showToast("File is missing", {
        type: "warning",
      });
    }
  };

  return (
    <div className="text-primary-blue-900 px-16 py-8 rounded border border-solid border-slate-300">
      <p className="text-xl">Upload your desired file</p>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.FormGroup otherStyles="!justify-center !items-start">
          <Form.FormGroup otherStyles="!items-start  !gap-8">
            <FileUpload
              name="file"
              //    @ts-ignore
              register={register}
              label=""
              value={file}
              onChange={(uploadedFile) => setFile(uploadedFile)}
            />
            <Input
              label="Name"
              variant="dynamic"
              name="name"
              register={register}
              required={true}
              extraClassName="!items-start"
            />
          </Form.FormGroup>
          <Button.Group color="text-white ">
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading || isUpdateLoading}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              className="text-primary-blue-900"
              onClick={() => {
                setIsUploadFile(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </Button.Group>
        </Form.FormGroup>
      </Form>
    </div>
  );
};

export default UploadGisFile;
