import { toast } from "react-toastify";

export const showAlert = (message, type = "success") => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    className: "bg-background text-foreground text-sm",
  });
};
