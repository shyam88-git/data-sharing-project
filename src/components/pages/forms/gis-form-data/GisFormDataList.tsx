import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";
import GisFormLayout from "../../../../layouts/GisFormLayout";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import BounceAnimation from "../../../../components/spinner/BounceAnimation";
import Table from "../../../../components/ui/table/Table";
import Pagination from "../../../../components/pagination/Pagination";
import { tableHeaderColumnGenerator } from "../../../../utils/helpers/generator";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmPopup from "../../../../components/popup/ConfirmPopup";
import useToastHook from "../../../../utils/hooks/toast/useToastHook";
import SearchInput from "../../../../components/ui/form/reusable/SearchInput";
import { FaFileDownload } from "react-icons/fa";
import {
  makeKeyword,
  notEmptyObject,
} from "../../../../utils/helpers/validator";
import { VscSettings } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import Form from "../../../../components/ui/form/Form";
import DropDown from "../../../../components/ui/form/reusable/DropDown";
import { FaFilter } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import {
  useDeleteDynamicFormDataMutation,
  useGetAllDynamicFormDataQuery,
  useGetFilterableFieldsQuery,
} from "../../../../store/modules/dynamic-form/dynamicFormApi";
import {
  DynamicObjectType,
  SearchParamsI,
} from "../../../../utils/interfaces/common";
import PopupModal from "../../../popup/PopupModal";
import ExcelUploadForm from "../../../../pages/form/ExcelUplod";
import { useDownloadExcelQuery } from "../../../../store/modules/excel/excelFileApi";
import * as xlsx from "xlsx";

const GisFormDataList = () => {
  const [searchParams] = useSearchParams();
  const formTitle = searchParams.get("title");
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastHook();
  const hasEffectRun = useRef(false);

  // component state
  const { register, handleSubmit, reset } = useForm<any>({});
  const [selectedFormDataId, setSelectedFormDataId] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [formDataLists, setFormDataLists] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState<string[]>(["S.N", "Action"]);
  const [openPopupModal, setOpenPopupModal] = useState<boolean>(false);
  const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
  
  const [params, setParams] = useState<SearchParamsI>({
    search: "",
    page: 1,
    per_page: 10,
    filter: [{ drop: "a" }],
  });

  // redux state
  const { data, isLoading } = useGetAllDynamicFormDataQuery({
    id: id || "",
    params,
  });
  const { data: FilterableFields } = useGetFilterableFieldsQuery({
    formId: id || "",
  });
  



  const [
    deleteDynamicFormData,
    {
      isSuccess: isDeleteDataSuccess,
      isLoading: isDeleteDataLoading,
      isError: isDeleteDataError,
      error: deleteDataError,
    },
  ] = useDeleteDynamicFormDataMutation();

  // useEffect
  useEffect(() => {
    if (data && notEmptyObject(data)) {
      setFormDataLists(data?.results);
      if (!hasEffectRun.current && data?.results?.length) {
        setTableColumns(
          tableHeaderColumnGenerator(tableColumns, data?.results[0])
        );
        hasEffectRun.current = true;
      }
    } else {
      setTableColumns(["S.N", "Action"]);
    }
  }, [data, hasEffectRun, params, tableColumns]);

  useEffect(() => {
    if (isDeleteDataSuccess) {
      showToast("Successfully deleted data.", { type: "success" });
    } else if (isDeleteDataError) {
      showToast("Something wrong. Try again later!", { type: "error" });
      console.log(deleteDataError, "@deleteDataError");
    }
    setConfirmOpen(false);
  }, [isDeleteDataSuccess, isDeleteDataError]);

  // helper functions
  const deleteFormDataHandler = async () => {
    await deleteDynamicFormData({ id: id || "", formId: selectedFormDataId });
  };
  const filterSubmitHandler = useCallback(
    (data: DynamicObjectType) => {
      if (notEmptyObject(data)) {
        const filterArray = Object.keys(data).map((key) => ({
          [makeKeyword(key)]: data[key],
        }));
        setParams((prevState) => ({ ...prevState, filter: filterArray }));
      }
    },
    [setParams]
  );

  // const handleSearchChange = useCallback((keyword: any) => {
  //   setParams((prevState) => ({ ...prevState, search: keyword || "" }));
  // },[setParams]);

  const closePopupModalHandler = () => {
    setOpenPopupModal(false);
    setIsUploadFile(false);
  };

  const successPopupModalHandler = () => {};

  const filterData = () => {
    const keyword = (params.search || "").toLowerCase().trim();
    return formDataLists.filter((data) =>
      Object.values(data).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(keyword)
      )
    );
  };

  const filteredData = filterData();

  const { data: downloadExcelData } = useDownloadExcelQuery(id);
  const handleDownload = () => {
    if (downloadExcelData) {
      //@ts-ignore
      const workSheet = xlsx.utils.json_to_sheet(downloadExcelData);
      const workBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet1");
      xlsx.writeFile(workBook, "Datasheet.xlsx");
    }
  };

  return (
    <>
      <ConfirmPopup
        showModal={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
        }}
        message="Are you sure, you want to delete this Data."
        isLoading={isDeleteDataLoading}
        onConfirm={deleteFormDataHandler}
      />
      <GisFormLayout>
        <div className="flex">
          <Button.Group margin="mb-4 text-white">
            <Button
              variant="focus"
              rounded="rounded-full"
              onClick={() => navigate(-1)}
            >
              <FaAngleLeft size={20} /> Back
            </Button>
          </Button.Group>
          <p className="w-full text-center text-primary-blue-900 font-semibold text-2xl capitalize">
            {formTitle?.split("-").join(" ") || "Test Form"}
          </p>

          
        </div>

        <div className="bg-white px-6 pt-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <VscSettings
                onClick={() => setShowFilter((prevState) => !prevState)}
                size={50}
                className={`-mt-6 cursor-pointer  p-2 rounded ${
                  showFilter
                    ? "bg-slate-500 text-white"
                    : " hover:bg-slate-500 hover:text-white"
                }`}
                title="Filter"
              />
              <SearchInput onChange={() => console.log()} name="search" />
            </div>

            <Button.Group margin="mb-12" otherStyles="items-center">
              <Button.Group otherStyles="justify-end  bg-black-400">
                <div className="justify-end p-2 rounded-lg">
                  <FaFileDownload
                    onClick={handleDownload}
                    className="mt-4 sm:mt-2 h-auto max-w-full"
                    style={{ color: "green" }}
                    size={30}
                    title="download Excel File"
                  />
                </div>
              </Button.Group>
              <Button.Group otherStyles="justify-center">
                <PiMicrosoftExcelLogoFill
                  style={{ color: "green" }}
                  size={30}
                  className="text-primary-blue-900  cursor-pointer"
                  title="Upload"
                  onClick={() => setOpenPopupModal(true)}
                />
              </Button.Group>
              <Button
                rounded="rounded-full"
                color="text-white"
                variant="primary"
                onClick={() => {
                  navigate(`/forms/${id}/create`);
                }}
              >
                <IoMdAddCircleOutline size={20} /> Add Data
              </Button>
            </Button.Group>
          </div>
          <div
            className={` mb-4  ${
              showFilter
                ? "opacity-100 translate-y-0 "
                : " -translate-y-4 opacity-0 "
            } transition-all duration-500 ease-in-out z-10`}
          >
            <Form onSubmit={handleSubmit(filterSubmitHandler)}>
              <Form.FormGroup isRow={true}>
                {FilterableFields?.fields.length &&
                  FilterableFields.fields.map((field, index) => {
                    return (
                      <DropDown
                        key={index}
                        label={field.label}
                        name={field.label}
                        placeholder={`Select ${field.label}`}
                        options={field.options.map((option) => ({
                          label: option.value,
                          value: option.value,
                        }))}
                        register={register}
                      />
                    );
                  })}
                <Button.Group margin="mb-6">
                  <Button
                    type="submit"
                    variant="focus"
                    color="text-white"
                    className=" text-xl py-3"
                  >
                    <FaFilter size={30} />
                  </Button>
                  <GrClose
                    onClick={() => {
                      setShowFilter(false);
                      setParams((prevState) => ({
                        ...prevState,
                        filter: null,
                      }));
                      reset();
                    }}
                    size={50}
                    className="bg-primary-danger hover:bg-primary-danger-950 text-white p-2 rounded cursor-pointer transition-colors duration-200 ease-in-out"
                  />
                </Button.Group>
              </Form.FormGroup>
            </Form>
          </div>
          <div
            className={`${
              showFilter ? "translate-y-0 " : "-translate-y-40"
            } transition-all duration-500 `}
          >
            {isLoading ? (
              <BounceAnimation />
            ) : (
              <>
                {filteredData.length > 0 ? (
                  <>
                    <Table>
                      <Table.Head tableColumn={tableColumns} />
                      <Table.Body>
                        {filteredData.map((data, idx) => (
                          <Table.Row key={idx}>
                            {Object.keys(data).map((key, i) => {
                              if (
                                key.toLowerCase() === "_id" ||
                                key.toLowerCase() === "id"
                              ) {
                                return <Table.Col key={i}>{idx + 1}</Table.Col>;
                              } else if (typeof data[key] === "boolean") {
                                // Convert boolean value to string representation
                                return (
                                  <Table.Col key={i}>
                                    {data[key].toString()}
                                  </Table.Col>
                                );
                              } else {
                                return (
                                  <Table.Col key={i}>{data[key]}</Table.Col>
                                );
                              }
                            })}
                            <Table.Col>
                              <Button.Group otherStyles="justify-center">
                                <FaEdit
                                  size={20}
                                  className="text-primary-blue-900 cursor-pointer"
                                  title="Edit"
                                  onClick={() => {
                                    navigate(
                                      `/forms/${id}/update?form_id=${
                                        data?.id || data?._id
                                      }`
                                    );
                                  }}
                                />{" "}
                                <RiDeleteBin6Line
                                  size={20}
                                  className="text-primary-danger-950 cursor-pointer"
                                  title="Delete"
                                  onClick={() => {
                                    setSelectedFormDataId(
                                      data?.id || data?._id
                                    );
                                    setConfirmOpen(true);
                                  }}
                                />
                              </Button.Group>
                            </Table.Col>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                    <Pagination
                      onPageChange={(page) => {
                        setParams((prevState) => ({ ...prevState, page }));
                      }}
                      hasPrevPage={params.page > 1}
                      hasNextPage={
                        (data?.total as number) >
                        +params?.per_page * params?.page
                      }
                      totalPages={Math.ceil(
                        (data?.total as number) / +params?.per_page
                      )}
                      currentPage={params.page}
                    />
                  </>
                ) : (
                  <Table>
                    <Table.Head tableColumn={tableColumns} />
                    <Table.Body>
                      <Table.Row>
                        <Table.Empty colSpan={2} />
                      </Table.Row>
                    </Table.Body>
                  </Table>
                )}
              </>
            )}
          </div>
        </div>
      </GisFormLayout>
      <PopupModal
        showModal={openPopupModal}
        onClose={closePopupModalHandler}
        onSuccess={successPopupModalHandler}
        title="Choose file"
        hideActionBtn={isUploadFile}
      >
        <ExcelUploadForm />
      </PopupModal>
    </>
  );
};

export default GisFormDataList;
