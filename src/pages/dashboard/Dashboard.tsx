import { useEffect, useState } from "react";
import { GisFileI } from "../../store/modules/gis-file/gisFileApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getAllGisFile,
  setActiveGis,
} from "../../store/modules/gis-file/gisFileSlice";
import { SearchParamsI } from "../../utils/interfaces/common";
import BounceAnimation from "../../components/spinner/BounceAnimation";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/ui/button/Button";
import useToastHook from "../../utils/hooks/toast/useToastHook";
import { useNavigate } from "react-router-dom";
import { navMenu } from "../../components/Navbar/NavMenu";
import UploadGisFile from "../../components/pages/gis-file/UploadGisFile";
import GisFileList from "../../components/pages/gis-file/GisFileList";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  // STATE
  const [searchParams, setSearchParams] = useState<SearchParamsI>({
    search: "",
    page: 1,
    per_page: 10,
  });
  const [selectedGis, setSelectedGis] = useState<GisFileI | null>(null);
  const [selectUpdateGis, setSelectUpdateGis] = useState<GisFileI | null>(null);
  const [isUploadFile, setIsUploadFile] = useState<boolean>(false);

  // REDUX

  // const activeGis = useAppSelector((store) => store.gisFile.activeGis);
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

  useEffect(() => {
    if (gisFile.allGisFile?.total === 0) {
      setSelectedGis(null);
    }
    if (gisFile.error) {
      showToast(gisFile.error, { type: "error" });
    }
  }, [gisFile]);

  // HELPER FUNCTION
  const GetGisFile = async () => {
    await dispatch(getAllGisFile({ params: searchParams }));
  };

  const saveActiveGisHandler = () => {
    if (selectedGis) {
      dispatch(setActiveGis(selectedGis));
      showToast(`File: ${selectedGis.name} is selected.`, { type: "success" });
    }
  };

  if (gisFile.loading) {
    return (
      <div className="h-8 flex justify-center items-center ">
        <BounceAnimation />
      </div>
    );
  }
  return (
    <DashboardLayout title="Welcome to NepGIS dashboard">
      <div className="bg-white px-8 py-8 rounded-sm">
        {isUploadFile && (
          <UploadGisFile
            selectUpdateGis={selectUpdateGis}
            setIsUploadFile={setIsUploadFile}
          />
        )}{" "}
        {!isUploadFile && !gisFile.activeGis?.id && (
          <>
            <h1>Search/Choose file to work with...</h1>
            <GisFileList
              setSelectUpdateGis={setSelectUpdateGis}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              allGisData={gisFile.allGisFile || null}
              selectedGis={selectedGis}
              setSelectedGis={setSelectedGis}
              loading={gisFile.loading}
              setIsUploadFile={setIsUploadFile}
            />
            <Button.Group color="text-white" otherStyles="justify-end -mt-10">
              <Button
                type="button"
                onClick={saveActiveGisHandler}
                variant="focus"
                isDisabled={gisFile.activeGis?.id === selectedGis?.id}
              >
                Save
              </Button>
            </Button.Group>
          </>
        )}{" "}
        {!isUploadFile && gisFile.activeGis?.id && (
          <>
            <div>
              <div className="bg-slate-300 py-4 px-8 rounded-md  text-2xl">
                <p>
                  {" "}
                  Working File : <strong>{selectedGis?.name}</strong>
                </p>
                <p>
                  File ID :<strong> {selectedGis?.id}</strong>
                </p>
              </div>
              <div className="mt-4 flex gap-8 text-3xl">
                {navMenu.map((menu, idx) => {
                  const Icon = menu.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-slate-300 py-6 px-8 rounded cursor-pointer hover:bg-slate-400"
                      onClick={() => {
                        navigate(`${menu.path}`);
                      }}
                    >
                      <Icon size={40} />
                      {menu.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
