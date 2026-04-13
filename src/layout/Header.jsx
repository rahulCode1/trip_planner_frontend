import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand text-light fw-bold" to="/">
          🌍 Travel AI
        </NavLink>

        {/* Toggle (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/tripPlanner"
              className={({ isActive }) =>
                `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
              }
            >
              Trip Planner
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
