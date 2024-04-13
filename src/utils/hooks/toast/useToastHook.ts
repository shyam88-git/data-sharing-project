import { toast, ToastOptions } from "react-toastify";

type UseToastOptions = ToastOptions;

const useToastHook = () => {
  const showToast = (message: string, options?: UseToastOptions) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#EDEDED",
        color: "#050B22",
      },
      ...options,
    });
  };

  return { showToast };
};

export default useToastHook;
