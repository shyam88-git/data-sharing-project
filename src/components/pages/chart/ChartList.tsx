import { useEffect, useRef, useState } from "react";
import { SearchParamsI } from "../../../utils/interfaces/common";
import {
  useDeleteChartMutation,
  useGetAllChartsQuery,
} from "../../../store/modules/chart/chartApi";
import BounceAnimation from "../../spinner/BounceAnimation";
import Table from "../../ui/table/Table";
import Pagination from "../../pagination/Pagination";
import { VscSettings } from "react-icons/vsc";
import SearchInput from "../../ui/form/reusable/SearchInput";
import {
  modifyKeyword,
  notEmptyObject,
} from "../../../utils/helpers/validator";
import { tableHeaderColumnGenerator } from "../../../utils/helpers/generator";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../../ui/button/Button";
import ConfirmPopup from "../../popup/ConfirmPopup";
import useToastHook from "../../../utils/hooks/toast/useToastHook";
import { FaEye } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PropsI {}

const ChartList = ({}: PropsI) => {
  const hasEffectRun = useRef(false);
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  //   STATE
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<string[]>(["S.N", "Action"]);
  const [selectedChartDataId, setSelectedChartDataId] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [chartDataList, setChartDataList] = useState<any[]>([]);
  const [queryParams, setQueryParams] = useState<SearchParamsI>({
    search: "",
    page: 1,
    per_page: 10,
  });

  // REDUX
  const { data: chartData, isLoading } = useGetAllChartsQuery({
    params: queryParams,
  });
  const [
    deleteChartData,
    {
      isSuccess: isDeleteDataSuccess,
      isLoading: isDeleteDataLoading,
      isError: isDeleteDataError,
      error: deleteDataError,
    },
  ] = useDeleteChartMutation();

  // USE EFFECT
  useEffect(() => {
    if (chartData && notEmptyObject(chartData)) {
      setChartDataList(chartData.results);
      if (!hasEffectRun.current && chartData?.results?.length) {
        setTableColumns(
          tableHeaderColumnGenerator(tableColumns, chartData?.results[0])
        );
        hasEffectRun.current = true;
      }
    } else {
      setTableColumns(["S.N", "Action"]);
    }
  }, [chartData, hasEffectRun, queryParams, tableColumns]);

  useEffect(() => {
    if (isDeleteDataSuccess) {
      showToast("Successfully deleted data.", { type: "success" });
    } else if (isDeleteDataError) {
      showToast("Something wrong. Try again later!", { type: "error" });
      console.log(deleteDataError, "@deleteDataError");
    }
    setConfirmOpen(false);
  }, [isDeleteDataSuccess, isDeleteDataError]);

  // HELPER FUNCION
  const deleteChartDataHandler = async () => {
    await deleteChartData({ id: selectedChartDataId || "" });
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden hidden-scrollbar">
      <ConfirmPopup
        showModal={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
        }}
        message="Are you sure, you want to delete this Data."
        isLoading={isDeleteDataLoading}
        onConfirm={deleteChartDataHandler}
      />
      <div className="flex items-center justify-between">
        {/* <h1 className="font-extra-bold text-2xl capitalize">Chart lists</h1> */}
        <Button.Group margin="mb-12">
          <Button
            rounded="rounded-full"
            color="text-white"
            variant="primary"
            onClick={() => {
              navigate(`/chart?create=new`);
            }}
          >
            <IoMdAddCircleOutline size={20} /> Add Chart
          </Button>
        </Button.Group>
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
          <SearchInput
            onChange={(keyword) =>
              setQueryParams((prevState) => ({ ...prevState, search: keyword }))
            }
            name="search"
          />
        </div>
      </div>
      <div>
        {isLoading ? (
          <BounceAnimation />
        ) : (
          <div className="w-full overflow-x-auto hidden-scrollbar">
            <Table>
              <Table.Head tableColumn={tableColumns} />
              <Table.Body>
                {chartDataList.length ? (
                  <>
                    {chartDataList.map((data, idx) => {
                      return (
                        <Table.Row key={idx}>
                          {Object.keys(data).map((key, i) => {
                            if (
                              key.toLowerCase() === "_id" ||
                              key.toLowerCase() === "id"
                            )
                              return <Table.Col key={i}>{idx + 1}</Table.Col>;
                            if (
                              !tableColumns.includes(
                                modifyKeyword(key).toLowerCase()
                              )
                            )
                              return;
                            return <Table.Col key={i}>{data[key]}</Table.Col>;
                          })}
                          <Table.Col>
                            <Button.Group otherStyles="justify-center">
                              <FaEye
                                size={20}
                                className="text-primary-blue-900 cursor-pointer"
                                title="Edit"
                                onClick={() => {
                                  navigate(
                                    `/chart?diagram=chart&id=${data?.id}`
                                  );
                                }}
                              />{" "}
                              <RiDeleteBin6Line
                                size={20}
                                className="text-primary-danger-950 cursor-pointer"
                                title="Delete"
                                onClick={() => {
                                  setSelectedChartDataId(data?.id || data?._id);
                                  setConfirmOpen(true);
                                }}
                              />
                            </Button.Group>
                          </Table.Col>
                        </Table.Row>
                      );
                    })}
                  </>
                ) : (
                  <Table.Empty colSpan={tableColumns.length} />
                )}
              </Table.Body>
            </Table>
            <Pagination
              onPageChange={(page) => {
                setQueryParams((prevState) => ({ ...prevState, page }));
              }}
              hasPrevPage={queryParams.page > 1}
              hasNextPage={
                (chartData?.total as number) >
                +queryParams?.per_page * queryParams?.page
              }
              totalPages={Math.ceil(
                (chartData?.total as number) / +queryParams?.per_page
              )}
              currentPage={queryParams.page}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartList;
