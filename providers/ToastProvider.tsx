import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#3333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToastProvider;
