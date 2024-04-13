import { useEffect, useRef, useState } from "react";
import {
  AllDynamicFormDataResponseI,
  FilterFieldI,
  useGetFilterableFieldsQuery,
} from "../../../../store/modules/dynamic-form/dynamicFormApi";
import {
  DynamicObjectType,
  StringArrayType,
} from "../../../../utils/interfaces/common";
import {
  dynamicColumnSelectErrorGenerator,
  tableHeaderColumnGenerator,
} from "../../../../utils/helpers/generator";
import Table from "../../../ui/table/Table";
import {
  makeKeyword,
  modifyKeyword,
  notEmptyObject,
} from "../../../../utils/helpers/validator";
import Pagination from "../../../pagination/Pagination";
import { IoSettings } from "react-icons/io5";
import { useForm } from "react-hook-form";
import FormDataColumnSelector from "./FormDataColumnSelector";
import SearchInput from "../../../ui/form/reusable/SearchInput";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { VscSettings } from "react-icons/vsc";
import FeatureFormDataFilter from "./FeatureFormDataFilter";
import Form from "../../../ui/form/Form";
import { PropertyFormStateI } from "../../../../pages/gis-map/MapPage";

interface PropsI {
  propertyFormData: AllDynamicFormDataResponseI | undefined;
  propertyFormId: PropertyFormStateI;
  setPropertyFormId: React.Dispatch<React.SetStateAction<PropertyFormStateI>>;
  activeTab: number;
  formId: string;
}

interface ShowIconI {
  settingOpen: boolean;
  searchOpen: boolean;
  filterOpen: boolean;
}

const initialShowIcon: ShowIconI = {
  settingOpen: false,
  searchOpen: false,
  filterOpen: false,
};

const FeatureFormDataTable = ({
  propertyFormData,
  setPropertyFormId,
  propertyFormId,
  activeTab,
  formId,
}: PropsI) => {
  let count = useRef(1);

  // STATE
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });
  const {
    register: filterRegister,
    handleSubmit: filterHandleSubmit,
    reset: filterReset,
  } = useForm<any>({
    defaultValues: {},
  });
  const [currentFilterFieldIndex, setCurrentFilterFieldIndex] =
    useState<number>(0);
  const [showIcon, SetShowIcon] = useState<ShowIconI>(initialShowIcon);
  const [dynamicFilterFields, setDynamicFilterFields] = useState<
    FilterFieldI[] | []
  >([]);
  const [dynamicPropertyColumns, setDynamicPropertyColumns] =
    useState<StringArrayType>([]);

  // REDUX
  const { data: filterFieldList } = useGetFilterableFieldsQuery({ formId });

  // USE EFFECT

  useEffect(() => {
    if (
      filterFieldList &&
      filterFieldList?.fields?.length &&
      dynamicPropertyColumns.length
    ) {
      const fieldList = filterFieldList?.fields.filter((field) =>
        dynamicPropertyColumns.includes(modifyKeyword(field.value))
      );
      if (fieldList?.length) setDynamicFilterFields(fieldList);
    } else setDynamicFilterFields([]);
  }, [filterFieldList, dynamicPropertyColumns]);

  useEffect(() => {
    count.current = 1;
    setCurrentFilterFieldIndex(0);
    reset({});
    filterReset({});
    SetShowIcon(initialShowIcon);
    setPropertyFormId((prevState) => ({
      ...prevState,
      params: { search: "", per_page: 10, page: 1 },
    }));
  }, [activeTab]);

  useEffect(() => {
    if (propertyFormData?.results.length) {
      setIsSettingOpen(false);
      if (count.current === 1) {
        const column = tableHeaderColumnGenerator(
          [],
          propertyFormData?.results[0],
          0
        );
        setDynamicPropertyColumns(column);
        setValue("dynamicColumn", column);
      }
      count.current++;
    }
  }, [propertyFormData]);

  // USE EFFECT
  const columnGeneratorSubmitHandler = (data: any) => {
    if (data?.dynamicColumn) {
      if (
        !dynamicColumnSelectErrorGenerator(data.dynamicColumn, setError, 2, 3)
      ) {
        setDynamicPropertyColumns(data.dynamicColumn);
        setIsSettingOpen(false);
      }
    }
  };

  // HELPER FUNCITON
  function setIsSettingOpen(val: boolean) {
    if (!val) {
      setIsSearchOpen(false);
      setIsFilterOpen(false);
      reset({});
      filterReset({});
    }
    SetShowIcon((prevState) => ({ ...prevState, settingOpen: val }));
  }
  function setIsSearchOpen(val: boolean) {
    SetShowIcon((prevState) => ({ ...prevState, searchOpen: val }));
  }
  function setIsFilterOpen(val: boolean) {
    SetShowIcon((prevState) => ({ ...prevState, filterOpen: val }));
  }

  const filterSubmitHandler = (data: DynamicObjectType) => {
    if (notEmptyObject(data)) {
      const filterArray = Object.keys(data).map((key) => ({
        [makeKeyword(key)]: data[key],
      }));
      setPropertyFormId((prevState) => ({
        ...prevState,
        params: { ...prevState.params, filter: filterArray },
      }));
    }
  };

  return (
    <div className="h-full w-full px-2 relative overflow-y-auto hidden-scrollbar  ">
      <div className="my-4 text-center">
        <p className="font-extrabold text-3xl">Form</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <IoSettings
            size={30}
            onClick={() => {
              setIsSettingOpen(!showIcon.settingOpen);
            }}
            className={`cursor-pointer mt-3 ${
              showIcon.settingOpen
                ? "animate-none"
                : "animate-spin hover:animate-none"
            } `}
            title="Settings and filter"
          />
          {!showIcon.settingOpen && (
            <>
              <div
                className={`${
                  showIcon.searchOpen ? "opacity-0 -z-10" : "opacity-100  z-10"
                } transition-opacity duration-500 ease-in-out`}
              >
                <FiSearch
                  onClick={() => setIsSearchOpen(true)}
                  size={50}
                  className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-slate-500 "
                  title="Search"
                />
              </div>
              <div className="overflow-hidden -translate-x-16  ">
                <div
                  className={`flex gap-2 ${
                    showIcon.searchOpen
                      ? "translate-x-0 opacity-100 z-10"
                      : "-translate-x-[500px] opacity-0 -z-10"
                  } transition-all duration-500 ease-linear`}
                >
                  <SearchInput
                    name="Search"
                    extraClassName="!-mb-8"
                    padding="!py-2 px-3"
                    onChange={(keyword) => {
                      setPropertyFormId((prevState) => ({
                        ...prevState,
                        params: { ...prevState.params, search: keyword },
                      }));
                    }}
                  />
                  <GrClose
                    onClick={() => {
                      setIsSearchOpen(false);
                      reset({});
                    }}
                    size={40}
                    className="text-primary-danger hover:text-primary-danger-950  mt-1   cursor-pointer transition-colors duration-200 ease-linear"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {!showIcon.settingOpen && (
          <div className="-translate-x-12">
            {showIcon.filterOpen ? (
              <GrClose
                onClick={() => {
                  setIsFilterOpen(false);
                  reset();
                }}
                size={50}
                className="bg-primary-danger hover:bg-primary-danger-950 text-white p-2 rounded cursor-pointer transition-colors duration-200 ease-in-out"
              />
            ) : (
              <VscSettings
                onClick={
                  dynamicFilterFields.length
                    ? () => setIsFilterOpen(true)
                    : () => {}
                }
                size={50}
                className={`${
                  dynamicFilterFields.length
                    ? " cursor-pointer hover:bg-slate-500 hover:text-white}"
                    : "text-slate-600"
                }  p-2 rounded  `}
                title="Filter"
              />
            )}
          </div>
        )}
      </div>
      {showIcon.settingOpen ? (
        <>
          <FormDataColumnSelector
            filterFieldList={filterFieldList}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setIsSettingOpen={setIsSettingOpen}
            submitHandler={columnGeneratorSubmitHandler}
            properties={propertyFormData}
          />
        </>
      ) : (
        <div className="overflow-hidden">
          <div
            className={`relative bg-slate-700 my-3 rounded p-3 rounded-tr-none  ${
              showIcon.filterOpen
                ? "translate-x-0 translate-y-0 opacity-100"
                : "translate-x-[500px] -translate-y-28 opacity-0"
            } transition-all duration-300 ease-in-out`}
          >
            <Form onSubmit={filterHandleSubmit(filterSubmitHandler)}>
              <FeatureFormDataFilter
                setCurrentIndex={setCurrentFilterFieldIndex}
                currentIndex={currentFilterFieldIndex}
                fields={dynamicFilterFields}
                register={filterRegister}
              />
            </Form>
          </div>

          <div
            className={`${
              showIcon.filterOpen ? "translate-y-0" : "-translate-y-72"
            } transition-transform duration-300 ease-in-out w-full hidden-scrollbar relative overflow-x-auto shadow-md sm:rounded-lg mt-8`}
          >
            <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-gray-700 uppercase dark:text-gray-400">
                <tr className="border-b-2 border-gray-200">
                  {dynamicPropertyColumns.map((column, i) => {
                    if (column.toLowerCase() === "feature id") return;
                    return (
                      <th
                        key={i}
                        scope="col"
                        className={`${
                          i % 2 === 0
                            ? "px-6 py-3 bg-gray-50 dark:bg-gray-800"
                            : "px-6 py-3"
                        }`}
                      >
                        {column}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {propertyFormData?.results?.length ? (
                  propertyFormData.results.map((property, idx) => (
                    <tr
                      key={idx}
                      className="text-white border-b border-gray-200 dark:border-gray-700"
                    >
                      {dynamicPropertyColumns.map((column, i) => {
                        if (column.toLowerCase() === "feature id") return;
                        const value =
                          //@ts-ignore
                          property[makeKeyword(column) as string];

                        return (
                          <td
                            key={i}
                            scope="col"
                            className={`${
                              i % 2 === 0
                                ? "px-6 py-4 bg-gray-50 dark:bg-gray-800"
                                : "px-6 py-4"
                            }`}
                          >
                            {value || "--"}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <Table.Empty
                    colSpan={dynamicPropertyColumns.length || 1}
                    bgColor="bg-slate-800"
                  />
                )}
              </tbody>
            </table>
            <Pagination
              flipColor={true}
              hasNextPage={
                propertyFormData?.total
                  ? propertyFormData?.total >
                    propertyFormId?.params.page *
                      +propertyFormId?.params.per_page
                  : false
              }
              hasPrevPage={propertyFormId?.params.page > 1}
              currentPage={propertyFormId?.params.page}
              totalPages={propertyFormData?.total_pages || 0}
              onPageChange={(page) =>
                setPropertyFormId((prevState) => ({
                  ...prevState,
                  params: { ...prevState.params, page },
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureFormDataTable;
