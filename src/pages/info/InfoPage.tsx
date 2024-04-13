import { FaCircleNodes } from "react-icons/fa6";

const InfoPage = () => {
  return (
    <>
      <div className="h-full w-full  flex items-center justify-center gap-4">
        <h1 className="font-extrabold text-2xl">Work in Progress</h1>
        <FaCircleNodes size={30} className="animate-spin" />
      </div>
    </>
  );
};

export default InfoPage;
