import { FaLocationDot } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SearchParamsI,
  StringArrayType,
} from "../../../../utils/interfaces/common";
import { IGisPropertiesResponse } from "../../../../store/modules/gis-file/gisFileApi";
import { PropertyFormStateI } from "../../../../pages/gis-map/MapPage";
import useToastHook from "../../../../utils/hooks/toast/useToastHook";
import {
  dynamicColumnSelectErrorGenerator,
  tableHeaderColumnGenerator,
} from "../../../../utils/helpers/generator";
import SearchInput from "../../../ui/form/reusable/SearchInput";
import Form from "../../../ui/form/Form";
import CheckboxGroup from "../../../ui/form/reusable/CheckBoxGroup";
import {
  makeKeyword,
  modifyKeyword,
} from "../../../../utils/helpers/validator";
import Button from "../../../ui/button/Button";
import Pagination from "../../../pagination/Pagination";

interface PropsI {
  searchParams: SearchParamsI;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParamsI>>;
  properties: IGisPropertiesResponse | null;
  selectFeatureById: (id: string) => void;
  selectedPositionId: string | null;
  showMapFormData: boolean;
  setSelectedPositionId: React.Dispatch<React.SetStateAction<string | null>>;
  setShowMapFormData: React.Dispatch<React.SetStateAction<boolean>>;
  setPropertyFormId: React.Dispatch<React.SetStateAction<PropertyFormStateI>>;
  propertyFormId: PropertyFormStateI;
}

const MapFeatures = ({
  searchParams,
  setSearchParams,
  properties,
  selectFeatureById,
  setSelectedPositionId,
  selectedPositionId,
  showMapFormData,
  setShowMapFormData,
  setPropertyFormId,
}: PropsI) => {
  const count = useRef(1);
  const { showToast } = useToastHook();

  // STATE
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<any>({});
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [dynamicPropertyColumns, setDynamicPropertyColumns] =
    useState<StringArrayType>([]);

  // USE EFFECT
  useEffect(() => {
    if (properties?.results.length) {
      if (count.current === 1) {
        const column = tableHeaderColumnGenerator(
          [],
          properties?.results[0],
          0
        );
        setDynamicPropertyColumns(column);
        setValue("dynamicColumn", column);
      }
    }
    count.current++;
  }, [properties]);

  // HELPER FUNCTION
  const submitHandler = (data: any) => {
    if (data?.dynamicColumn) {
      if (!dynamicColumnSelectErrorGenerator(data.dynamicColumn, setError)) {
        setDynamicPropertyColumns(data.dynamicColumn);
        setIsSettingOpen(false);
      }
    }
   
  };

  return (
    <>
      {!isSettingOpen && (
        <SearchInput
          name="Search"
          width="w-[30%]"
          rounded="rounded-full"
          extraClassName="ml-8"
          padding="!py-2 px-3"
          onChange={(keyword) => {
            setSearchParams((prevState) => {
              return {
                ...prevState,
                search: keyword,
              };
            });
          }}
        />
      )}

      <IoSettings
        size={30}
        onClick={() => {
          setIsSettingOpen((prevState) => !prevState);
        }}
        className={`absolute right-[5%] top-3 cursor-pointer ${
          isSettingOpen ? "animate-none" : "animate-spin hover:animate-none"
        } `}
        title="Settings and filter"
      />

      {isSettingOpen ? (
        <div className="w-[90%] ml-6 mt-12 p-4 bg-slate-700 rounded-l-lg     rounded-br-lg">
          <h1 className="font-bold text-2xl">Choose properties column?</h1>

          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.FormGroup>
            <div
                className="max-h-[300px] overflow-y-auto"
                style={{ overflowY: "auto" }}
              >
              <CheckboxGroup
                name="dynamicColumn"
                error={
                  errors?.dynamicColumn &&
                  (errors.dynamicColumn.message as string)
                }
                
                options={
                  properties?.results?.length
                    ? Object.keys(properties.results[0])
                        .filter(
                          (key) => !!key && key.toLowerCase() !== "feature_id" && key.toLowerCase()!=='_id'
                          && key.toLowerCase()!=='data_count'
                        )
                        .map((key) => {
                          return {
                            label: modifyKeyword(key),
                            value: modifyKeyword(key),
                            
                            };
                        })
                    : [{ label: "No Options", value: "" }]
                }
                register={register}
              />
              </div>
            </Form.FormGroup>
            <Button.Group margin="mt-4">
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSettingOpen(false)}
              >
                Cancel
              </Button>
            </Button.Group>
          </Form>
        </div>
      ) : (
        <>
          <div className=" h-[80%] overflow-y-auto w-full  hidden-scrollbar">
            {properties &&
              properties.results.map((property, idx) => (
                <div
                  key={idx}
                  className="border-b border-solid border-slate-700 px-8 py-6 flex justify-between items-center"
                >
                  <div className="">
                    <div className="capitalize font-bold text-2xl">
                    {`Fid - ${property.feature_id}`} &nbsp; &nbsp; {`[${property.data_count ?? 0}]`}
                    

                    </div>
                     {Object.keys(property).slice(1,4).map((key,i)=>{

                       const value=property[key];
                       return((
                        <div key={i} className="capitalize text-lg">
                        {value !== undefined ? (
                          <span>{`${key} - ${value}`}</span>
                        ) : (
                          <span className="text-slate-600">{`No ${key}`}</span>
                        )}
                      </div>
                       ))
                     })}
                    {dynamicPropertyColumns.slice(3).map((column, i) => {
                      if (column.toLowerCase() === "feature id") return;
                      const value =
                        //@ts-ignore
                        property[makeKeyword(column) as string];

                      return (
                        <div key={i} className="capitalize text-lg">
                          {value ? (
                            `${column} - ${value}`
                          ) : (
                            <span className="text-slate-600">{`No ${column}`}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center ">
                      <div
                        onClick={() => {
                          selectFeatureById(property.feature_id);
                          setSelectedPositionId(property.feature_id);
                          setShowMapFormData(false);
                        }}
                        className={`mb-2 h-10 w-10 border border-solid rounded-full flex items-center justify-center cursor-pointer ${
                          selectedPositionId === property.feature_id
                            ? "border-primary-danger-950"
                            : "hover:bg-slate-700"
                        }`}
                      >
                        <FaLocationDot
                          size={20}
                          className={`${
                            selectedPositionId === property.feature_id
                              ? "text-primary-danger-950"
                              : ""
                          }`}
                        />
                      </div>
                      <p>Pin</p>
                    </div>
                    <div className="text-center ">
                      <div
                        onClick={
                          selectedPositionId === property.feature_id
                            ? () => {
                                setShowMapFormData((prevState) => !prevState);
                                setPropertyFormId((prevState) => ({
                                  ...prevState,
                                  propertyId: property._id,
                                }));
                              }
                            : () => {
                                showToast("Feature not selected.", {
                                  type: "warning",
                                });
                              }
                        }
                        className={` mb-2 h-10 w-10 border border-solid rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 ${
                          selectedPositionId === property.feature_id &&
                          showMapFormData
                            ? "bg-black"
                            : ""
                        }`}
                      >
                        <AiFillEye size={20} />
                      </div>
                      <p>Data</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            flipColor={true}
            onPageChange={(page) => {
              setSearchParams((prevState) => ({ ...prevState, page }));
            }}
            currentPage={searchParams.page}
            hasNextPage={
              (properties ? +properties?.total : 0) >
              searchParams.page * +searchParams.per_page
            }
            hasPrevPage={searchParams.page > 1}
            totalPages={Math.ceil(
              (properties ? +properties?.total : 0) / +searchParams.per_page
            )}
          />
        </>
      )}
    </>
  );
};

export default MapFeatures;
