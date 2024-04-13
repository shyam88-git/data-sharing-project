import { useEffect, useState } from "react";
import { GisFileI } from "../../../store/modules/gis-file/gisFileApi";
import BounceAnimation from "../../spinner/BounceAnimation";
import PopupModal from "../../popup/PopupModal";
import GisFileList from "./GisFileList";
import UploadGisFile from "./UploadGisFile";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  getAllGisFile,
  setActiveGis,
} from "../../../store/modules/gis-file/gisFileSlice";
import { SearchParamsI } from "../../../utils/interfaces/common";
import useToastHook from "../../../utils/hooks/toast/useToastHook";
import { useLocation } from "react-router-dom";

const ActiveGisFile = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToastHook();
  const { pathname } = useLocation();

  // STATE
  const [searchParams, setSearchParams] = useState<SearchParamsI>({
    search: "",
    page: 1,
    per_page: 10,
  });
  const [selectedGis, setSelectedGis] = useState<GisFileI | null>(null);
  const [selectUpdateGis, setSelectUpdateGis] = useState<GisFileI | null>(null);
  const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
  const [openPopupModal, setOpenPopupModal] = useState<boolean>(false);

  // REDUX

  const gisFile = useAppSelector((store) => store.gisFile);

  // USEEFFECT
  useEffect(() => {
    GetGisFile();
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (gisFile.activeGis) {
      setSelectedGis(gisFile.activeGis);
    }
  }, [gisFile.activeGis, dispatch]);

  // HELPER FUNCTION

  const GetGisFile = async () => {
    await dispatch(getAllGisFile({ params: searchParams }));
  };

  const closePopupModalHandler = () => {
    setOpenPopupModal(false);
    setIsUploadFile(false);
    setSelectedGis(gisFile.activeGis);
  };
  const successPopupModalHandler = () => {
    if (selectedGis) {
      dispatch(setActiveGis(selectedGis));
      setOpenPopupModal(false);
      showToast(`File: ${selectedGis.name} is selected.`, {
        type: "success",
      });
    }
  };

  if (!isUploadFile && gisFile.loading) {
    return (
      <div className="h-8 flex justify-center items-center ">
        <BounceAnimation />
      </div>
    );
  }
  return (
    <>
      <p
        onClick={
          pathname !== "/dashboard"
            ? () => {
                setOpenPopupModal(true);
              }
            : () => {
                showToast("Click on file name to select specific file.", {
                  type: "info",
                });
              }
        }
        className="font-medium text-lg px-4 py-2 rounded cursor-pointer bg-slate-700  hover:bg-primary-gray-50 hover:text-primary-blue-900 transition-all duration-200 ease-linear"
      >
        {gisFile.activeGis?.name || "NOT Selected"}
      </p>
      <PopupModal
        showModal={openPopupModal}
        onClose={closePopupModalHandler}
        onSuccess={successPopupModalHandler}
        title="Choose file"
        hideActionBtn={isUploadFile}
      >
        {isUploadFile ? (
          <UploadGisFile
            selectUpdateGis={selectUpdateGis}
            setIsUploadFile={setIsUploadFile}
          />
        ) : (
          <GisFileList
            setSelectUpdateGis={setSelectUpdateGis}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            allGisData={gisFile.allGisFile || null}
            selectedGis={selectedGis}
            setSelectedGis={setSelectedGis}
            loading={!isUploadFile && gisFile.loading}
            setIsUploadFile={setIsUploadFile}
          />
        )}
      </PopupModal>
    </>
  );
};

export default ActiveGisFile;
