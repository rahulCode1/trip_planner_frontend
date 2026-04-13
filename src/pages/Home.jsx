import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container">

        {/* HERO SECTION */}
        <div className="text-center p-5 rounded shadow bg-dark border border-secondary">

          <h1 className="display-4 fw-bold mb-3">
            🌍 AI Travel Planner
          </h1>

          <p className="lead text-light opacity-75 mb-4">
            Plan your perfect trip in seconds using AI. Get personalized
            itineraries, budgets, top attractions, and travel tips for any destination.
          </p>

          {/* FEATURES */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="p-3 rounded bg-secondary h-100">
                ✈️ Smart Trip Itineraries
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 rounded bg-secondary h-100">
                💰 Budget Estimates
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 rounded bg-secondary h-100">
                🏞️ Top Attractions
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <NavLink
            to="/tripPlanner"
            className="btn btn-primary btn-lg px-4"
          >
            Start Planning 🚀
          </NavLink>

        </div>

      </div>
    </main>
  );
};

export default Home;