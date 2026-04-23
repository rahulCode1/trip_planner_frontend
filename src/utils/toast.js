import { toast } from "react-toastify";

const loadingToast = (message) => {
  return toast.loading(message);
};

const successToast = (toastId, message) => {
  return toast.update(toastId, {
    render: message,
    type: "success",
    autoClose: 3000,
    isLoading: false
  });
};

const toastError = (toastId, message) => {
  return toast.update(toastId, {
    render: message,
    type: "error",
    autoClose: 3000,
    isLoading: false
  });
};

export { loadingToast, successToast, toastError };
