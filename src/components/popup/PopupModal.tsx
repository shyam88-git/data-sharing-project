import React ,{useState} from "react";
import Spinner from "../spinner/Spinner";
interface PropsI {
  showModal: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  children?: React.ReactNode;
  hideActionBtn?: boolean;
}

export default function PopupModal({
  showModal,
  onClose,
  onSuccess,
  title,
  children,
  hideActionBtn = false,
}: PropsI) {

  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    setLoading(true);

    // Simulate a 3-second delay
    setTimeout(async () => {
      try {
        await onSuccess();
      } finally {
        setLoading(false);
        window.location.reload();

      }
    }, 1000);
    
}
  
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999999] outline-none focus:outline-none">
            <div className="relative w-auto my-6  mx-auto max-w-3xl  max-h-[calc(120vh-200px)]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-primary-blue-900">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black   float-right text-3xl leading-none font-semibold outline-none rounded-full hover:bg-slate-200 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
                {/*footer*/}
                {!hideActionBtn && (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-primary-danger background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary-blue-600 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSuccess}
                      disabled={loading} 
                    >
                       {loading ? <Spinner/> : "Save"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
