import { useEffect, useState } from "react";
import ShowMap from "./ShowMap";
import { AiOutlineUnorderedList } from "react-icons/ai";

import {
  GisFileI,
  IGisPropertiesResponse,
} from "../../store/modules/gis-file/gisFileApi";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { GeoJsonFeatureI } from "../../utils/interfaces/geoJson";
import { LatLngExpression } from "leaflet";
import { TransformedPointCoordinates } from "../../utils/helpers/transformed-coordinates";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import { SearchParamsI } from "../../utils/interfaces/common";

import {
  useGetAllDynamicFormDataQuery,
  useGetAllDynamicFormQuery,
} from "../../store/modules/dynamic-form/dynamicFormApi";
import { IconType } from "react-icons";
import { useAppSelector } from "../../store/hook";
import FormIcon from "../../components/pages/gis-map/FormIcon";
import MapFeatures from "../../components/pages/gis-map/map-features/MapFeatures";
import FeatureFormDataTable from "../../components/pages/gis-map/map-form-data/FeatureFormDataTable";

export interface PropertyFormStateI {
  propertyId: string;
  params: SearchParamsI;
  formId: string;
}

const MapPage = () => {
  const { showToast } = useToastHook();

  // STATE
  const [mapNavMenu, setMapNavMenu] = useState<
    {
      idx: number;
      icon: IconType | null;
      el: React.ReactNode | null;
      fid: string | null;
      formId: string | null;
    }[]
  >([
    {
      idx: 1,
      icon: AiOutlineUnorderedList,
      el: null,
      formId: null,
      fid: null,
    },
  ]);
  const [searchParams, setSearchParams] = useState<SearchParamsI>({
    search: "",
    page: 1,
    per_page: 10,
  });
  const [gisData, setGisData] = useState<GisFileI | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [properties, setProperties] = useState<IGisPropertiesResponse | null>(
    null
  );
  const [selectedPosition, setSelectedPosition] =
    useState<LatLngExpression | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null
  );
  const [propertyFormId, setPropertyFormId] = useState<PropertyFormStateI>({
    propertyId: "",
    formId: "",
    params: { search: "", per_page: 10, page: 1 },
  });
  const [showMapProperties, setShowMapProperties] = useState<boolean>(false);
  const [showMapFormData, setShowMapFormData] = useState<boolean>(false);

  // REDUX
  const activeGis = useAppSelector((store) => store.gisFile.activeGis);
  const { data: featureForm } = useGetAllDynamicFormQuery({
    id: activeGis?.id?.toString() || "",
    feature: selectedPositionId || "",
    params: {
      page: 1,
      per_page: 1000,
    },
  });
  const { data: propertyFormData } = useGetAllDynamicFormDataQuery({
    id: propertyFormId.formId,
    params: propertyFormId.params,
    propertyId: propertyFormId.propertyId,
  });

  // USE EFFECT
  useEffect(() => {
    setSelectedPosition(null);
    setSelectedPositionId(null);
  }, [gisData]);

  useEffect(() => {
    if (showMapFormData && mapNavMenu.length < 2) {
      showToast("Data not available.", {
        type: "error",
      });
    }
  }, [showMapFormData]);

  useEffect(() => {
    const filteredMapNavMenu = mapNavMenu.filter((item) =>
      item.idx !== 1 ? item.fid === selectedPosition : true
    );
    if (selectedPositionId && featureForm && featureForm?.total > 0) {
      featureForm?.results.forEach((form) =>
        filteredMapNavMenu.push({
          idx: filteredMapNavMenu.length + 1,
          icon: null,
          el: <FormIcon idx={filteredMapNavMenu.length} />,
          fid: selectedPositionId,
          formId: form?.id || "",
        })
      );
    }
    setMapNavMenu(filteredMapNavMenu);
  }, [featureForm, selectedPositionId]);

  // HELPER FUNCTION
  const selectedPositionHandler = (feature: GeoJsonFeatureI) => {
    if (feature.geometry.type.toLowerCase() === "point") {
      setSelectedPosition(
        TransformedPointCoordinates(feature.geometry.coordinates)
      );
    } else if (feature.geometry.type.toLowerCase() === "multipoint") {
      feature.geometry.coordinates?.length
        ? setSelectedPosition(
            TransformedPointCoordinates(feature.geometry.coordinates[0])
          )
        : showToast("Cannot get coordinates", { type: "error" });
    } else if (feature.geometry.type.toLowerCase() === "linestring") {
      feature.geometry.coordinates?.length
        ? setSelectedPosition(
            TransformedPointCoordinates(feature.geometry.coordinates[0])
          )
        : showToast("Cannot get coordinates", { type: "error" });
    } else if (feature.geometry.type.toLowerCase() === "polygon") {
      feature.geometry.coordinates?.length &&
      feature.geometry.coordinates[0].length
        ? setSelectedPosition(
            TransformedPointCoordinates(feature.geometry.coordinates[0][0])
          )
        : showToast("Cannot get coordinates", { type: "error" });
    } else {
      setSelectedPosition(null);
    }
  };

  const selectFeatureById = (id: string) => {
    const matchedFeature = gisData?.geojson?.features.find(
      (feature) => feature.id === id
    );
    if (matchedFeature) {
      selectedPositionHandler(matchedFeature);
    }
  };

  return (
    <div className="relative h-full">
      {!!gisData && Object.keys(gisData).length && (
        <>
          {!showMapProperties && (
            <div
              onClick={() => {
                setShowMapProperties(true);
              }}
              // className="py-6 px-2 rounded-r-lg  cursor-pointer  bg-primary-blue-400 hover:bg-slate-500 transition-all duration-500 ease-linear absolute top-[50%] left-[100px] z-[998] text-primary-gray-150"
            >
              {/* <FaAngleDoubleRight size={20} className="" /> */}
            </div>
          )}

          <div
            className={`h-full   bg-primary-blue-400 text-primary-gray-150 py-4  absolute  left-0 z-[998] ${
              showMapProperties ? "w-[600px] " : "w-[100px] overflow-x-auto"
            } hidden-scrollbar transition-width duration-500 ease-linear`}
          >
            <span
              onClick={() => {
                setShowMapProperties(false);
              }}
              className="absolute top-[50%] py-6 px-2  rounded-r-lg -right-8 bg-primary-blue-400   cursor-pointer"
            >
              <FaAngleDoubleLeft
                size={20}
                className="hover:text-slate-950 transition-colors duration-200 ease-in-out"
              />
            </span>
            <div className="absolute px-4  h-full left-0 top-0 w-[100px] bg-primary-blue-900 border-l border-solid border-black shadow-[-1px_0px_0px_0px_#000] z-10">
              <div className="mt-8">
                {mapNavMenu.map((menu) => {
                  if (!showMapFormData && menu.idx !== 1) return;
                  const Icon = menu.icon;
                  return (
                    <span
                      key={menu.idx}
                      className={` ${
                        activeTab == menu.idx
                          ? "bg-slate-600"
                          : "hover:bg-slate-700"
                      } cursor-pointer  flex items-center justify-center p-2  rounded-md my-2`}
                      onClick={() => {
                        {
                          !showMapProperties && setShowMapProperties(true);
                        }
                        setActiveTab(menu.idx);
                        if (typeof menu.formId === "string")
                          setPropertyFormId((prevState) => ({
                            ...prevState,
                            formId: menu.formId || "",
                          }));
                      }}
                    >
                      {Icon ? <Icon size={30} /> : menu.el}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="absolute h-[90%]  right-0 w-[500px]">
              {activeTab === 1 ? (
                <MapFeatures
                  propertyFormId={propertyFormId}
                  showMapFormData={showMapFormData}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  properties={properties}
                  selectFeatureById={selectFeatureById}
                  selectedPositionId={selectedPositionId}
                  setSelectedPositionId={setSelectedPositionId}
                  setShowMapFormData={setShowMapFormData}
                  setPropertyFormId={setPropertyFormId}
                />
              ) : (
                <FeatureFormDataTable
                  propertyFormData={propertyFormData}
                  setPropertyFormId={setPropertyFormId}
                  propertyFormId={propertyFormId}
                  activeTab={activeTab}
                  formId={
                    mapNavMenu.find((menu) => menu.idx === activeTab)?.formId ||
                    ""
                  }
                />
              )}
            </div>
          </div>
        </>
      )}

      <div
        className={`absolute ${
          !activeGis?.id ? "!w-full" : ""
        }  h-full  z-10 right-0 transition-width duration-300 ease-in-out`}
        style={{
          width: `calc(100% - 100px)`,
        }}
      >
        <ShowMap
          activeGis={activeGis}
          selectedPosition={selectedPosition}
          setGisDataInfo={setGisData}
          selectedPositionId={selectedPositionId}
          setPropertiesList={setProperties}
          propertiesParams={searchParams}
        />
      </div>
    </div>
  );
};

export default MapPage;
