import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Toast = () => {
  return (
    <ToastContainer
      bodyClassName="custom-text"
      position="top-center"
      theme="dark"
      rtl={false}
      autoClose={3000}
      pauseOnHover
    />
  );
};

export const showToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    position: "bottom-center",
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
