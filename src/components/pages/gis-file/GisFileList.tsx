import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import {
  GisAllFileResponseI,
  GisFileI,
  useDeleteGisFileMutation,
} from "../../../store/modules/gis-file/gisFileApi";
import { FaEdit, FaFileContract } from "react-icons/fa";
import Form from "../../ui/form/Form";
import { useForm } from "react-hook-form";
import Input from "../../ui/form/reusable/InputField";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../pagination/Pagination";
import {
  DynamicObjectType,
  SearchParamsI,
} from "../../../utils/interfaces/common";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import useToastHook from "../../../utils/hooks/toast/useToastHook";
import { getAllGisFile } from "../../../store/modules/gis-file/gisFileSlice";
import { useAppDispatch } from "../../../store/hook";
import { IoIosWarning } from "react-icons/io";

interface PropsI {
  searchParams: SearchParamsI;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParamsI>>;
  allGisData: GisAllFileResponseI | null;
  selectedGis: GisFileI | null;
  loading: boolean;
  setSelectUpdateGis: React.Dispatch<React.SetStateAction<GisFileI | null>>;
  setSelectedGis: React.Dispatch<React.SetStateAction<GisFileI | null>>;
  setIsUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
}

const GisFileList = ({
  searchParams,
  setSelectUpdateGis,
  setSearchParams,
  allGisData,
  selectedGis,
  setSelectedGis,
  setIsUploadFile,
}: PropsI) => {
  const { showToast } = useToastHook();
  const dispatch = useAppDispatch();

  // STATE
  const [showConfirm, setShowConfirm] = useState<DynamicObjectType>({});
  const { handleSubmit, register } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });
  const [
    deleteGisFile,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteGisFileMutation();

  // USEEFFECT
  useEffect(() => {
    if (allGisData?.results?.length) {
      allGisData.results.forEach((data) =>
        setShowConfirm((prevState) => ({ ...prevState, [data?.id]: false }))
      );
    }
  }, [allGisData]);

  useEffect(() => {
    if (isDeleteError) {
      // @ts-ignore
      const errors = deleteError?.data?.errors;
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
  }, [isDeleteError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      GetGisFile();
      showToast("Successfully file deleted.", { type: "success" });
      setAllShowConfirmFalse();
    }
  }, [isDeleteSuccess]);

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
  function setAllShowConfirmFalse() {
    const newObj: DynamicObjectType = {};
    Object.keys(showConfirm).forEach((key) => {
      newObj[key] = false;
    });
  }

  const submitHandler = (data: { search: string }) => {
    const { search } = data;
    setSearchParams((prevState) => ({ ...prevState, search }));
  };

  const deleteGisFileHandler = async (id: string) => {
    await deleteGisFile({ id });
  };

  return (
    <div className="text-primary-blue-900 ">
      <div className="mb-8">
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.FormGroup isRow={true} otherStyles="items-center">
            <Input
              variant="dynamic"
              width="w-[200px] md:w-[600px]"
              rounded="rounded-md"
              className="!text-base !py-3 mb-[-16px]"
              label=""
              name="search"
              register={register}
            />
            <Button.Group color="text-white text-lg">
              <Button type="submit" variant="primary" className="py-2 mb-1">
                <CiSearch size={32} />
              </Button>
            </Button.Group>
          </Form.FormGroup>
        </Form>
        <div className="border border-solid p-2 rounded border-slate-400">
          {allGisData?.results?.length ? (
            <>
              <div className="border border-solid p-4 rounded border-slate-400">
                {allGisData.results.map((gis, idx) => (
                  <div
                    key={gis.id}
                    className={`w-full flex justify-between items-center p-2 rounded border border-solid border-slate-100 mb-1 hover:bg-slate-200 hover:border-slate-400
                `}
                    onClick={() => {
                      setSelectedGis(gis);
                    }}
                  >
                    <div className="flex gap-4 items-center justify-start">
                      <span>{idx + 1}.</span>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <FaFileContract />

                        <p
                          className={`font-extrabold text-base ${
                            selectedGis?.id === gis.id
                              ? "text-primary-blue-400"
                              : "text-primary-blue-350 hover:text-primary-blue-380"
                          }  `}
                        >
                          {gis.name}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Button.Group otherStyles="justify-center">
                        <FaEdit
                          size={20}
                          className="text-primary-blue-900 cursor-pointer"
                          title="Edit"
                          onClick={() => {
                            setSelectUpdateGis(gis);
                            setIsUploadFile(true);
                          }}
                        />{" "}
                        <RiDeleteBin6Line
                          size={20}
                          className="text-primary-danger-950 cursor-pointer"
                          title="Delete"
                          onClick={() => {
                            setShowConfirm((prevState) => ({
                              ...prevState,
                              [gis?.id]: true,
                            }));
                          }}
                        />
                      </Button.Group>
                      <div
                        className={`deleteMessageMenu absolute  bg-primary-blue-900 z-[99999] rounded-md rounded-tr-none px-8 w-96 py-4  -right-4 top-10 text-white ${
                          showConfirm[gis?.id] ? "block" : "hidden"
                        } `}
                      >
                        <p className="font-semibold">
                          <IoIosWarning
                            size={40}
                            className="inline-block pr-2 text-yellow-400"
                          />
                          Do you want to delete this file?
                        </p>
                        <p className="italic p-2  text-yellow-300">
                          Deleting this file will result in the loss of all
                          associated data like GeoJson, Properties, Forms,
                          Charts,etc
                        </p>
                        <Button.Group otherStyles="justify-end">
                          <button
                            onClick={() => {
                              setShowConfirm((prevState) => ({
                                ...prevState,
                                [gis?.id]: false,
                              }));
                            }}
                            className="bg-slate-300 hover:bg-slate-50 text-primary-blue-900 py-1 px-2  text-sm rounded-md transition-all duration-200 ease-in-out"
                          >
                            No
                          </button>
                          <button
                            onClick={() => {
                              deleteGisFileHandler(gis?.id.toString());
                            }}
                            className="bg-primary-danger-800 hover:bg-primary-danger-950  py-1 px-2  text-sm rounded-md transition-all duration-200 ease-in-out"
                          >
                            {isDeleteLoading ? (
                              <VscLoading className="animate-spin" />
                            ) : (
                              "Yes"
                            )}
                          </button>
                        </Button.Group>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                totalPages={Math.ceil(
                  allGisData?.total / +searchParams.per_page
                )}
                hasPrevPage={searchParams.page > 1}
                hasNextPage={
                  allGisData?.total > searchParams.page * +searchParams.per_page
                }
                currentPage={searchParams.page}
                onPageChange={(page) =>
                  setSearchParams((prevState) => ({ ...prevState, page }))
                }
              />
            </>
          ) : (
            /* loading ? (
            <BounceAnimation />
          ) :  */ <h1 className="text-center font-medium text-xl text-primary-gray-300 py-28">
              NO Data found
            </h1>
          )}
        </div>
      </div>
      <Button.Group color="text-primary-blue-3">
        <Button
          variant="ghost"
          onClick={() => {
            setIsUploadFile(true);
          }}
        >
          Upload
        </Button>
      </Button.Group>
    </div>
  );
};

export default GisFileList;
