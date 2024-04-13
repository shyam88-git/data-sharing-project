import { IoIosWarning } from "react-icons/io";
import TinySpinner from "../spinner/TinySpinner";

interface PopupPropsI {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  message?: string;
}

export default function ConfirmPopup({
  onClose,
  message,
  isLoading = false,
  onConfirm,
  showModal,
}: PopupPropsI) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold flex gap-2 items-center">
                    <IoIosWarning className="text-yellow-500" size={30} />{" "}
                    Please confirm your action.
                  </h3>
                  <button
                    className="p-1 ml-auto  border-0 text-black  float-right text-3xl 
                    rounded-full leading-none font-semibold outline-none focus:outline-none hover:bg-slate-300"
                    onClick={onClose}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {message}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-primary-danger background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                  >
                    {isLoading ? <TinySpinner /> : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
