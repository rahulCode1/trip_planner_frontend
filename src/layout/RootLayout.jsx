// RootLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
