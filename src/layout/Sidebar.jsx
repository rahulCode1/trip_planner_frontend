// Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`d-none d-md-flex flex-column align-items-center position-fixed top-0 start-0 vh-100 bg-dark border-end border-secondary ${styles.sidebar}`}
    >
      <NavLink
        className="navbar-brand text-light fw-bold fs-5 pb-3 mb-3 border-bottom border-secondary w-100 text-center"
        to="/"
      >
        🌍 Travel AI
      </NavLink>

      <NavLink
        end
        to="/"
        className={({ isActive }) =>
          `text-decoration-none text-white text-center rounded py-2 mb-2 w-75 ${isActive ? "bg-primary" : "bg-secondary"}`
        }
      >
        Trip Planner
      </NavLink>

      {token && (
        <NavLink
          to="/myTrips"
          className={({ isActive }) =>
            `text-decoration-none text-white text-center rounded py-2 mb-2 w-75 ${isActive ? "bg-primary" : "bg-secondary"}`
          }
        >
          My Trips
        </NavLink>
      )}

      {!token && (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-decoration-none text-white text-center rounded py-2 mb-2 w-75 ${isActive ? "bg-primary" : "bg-secondary"}`
          }
        >
          Login
        </NavLink>
      )}

      {token && (
        <button
          onClick={logout}
          className={`btn btn-outline-secondary text-light mt-auto mb-4 w-75 ${styles.logoutBtn}`}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
