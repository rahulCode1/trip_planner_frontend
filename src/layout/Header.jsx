import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg d-md-none navbar-dark bg-dark border-bottom border-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          🌍 Travel AI
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 py-2">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                }
              >
                Trip Planner
              </NavLink>
            </li>

            {!token && (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <NavLink
                  to="/myTrips"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  My Trips
                </NavLink>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-outline-secondary text-light px-3"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
