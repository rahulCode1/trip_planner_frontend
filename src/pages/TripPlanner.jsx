import axios from "axios";
import { useState } from "react";
import location from "../imgs/location.png";

const TripPlanner = () => {
  const initialState = {
    destination: "",
    duration: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/travel-planner?destination=${formData.destination}&duration=${formData.duration}`,
      );

      console.log(res.data);
      setTrip(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-dark text-light min-vh-100 pb-4">
      <div className="container pt-4">
        <h1 className="my-4">Plan your trip</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleOnChange}
                className="form-control"
                placeholder="Enter destination"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleOnChange}
                className="form-select"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i}>{i + 1} day</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 w-100"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Travel Plan"}
            {isLoading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </form>

        {trip && (
          <section className="mt-5">
            {/* Header */}
            <div className="p-4 d-flex align-items-center rounded shadow bg-secondary">
              <img
                src={location}
                alt=""
                className="me-3"
                style={{ width: "40px" }}
              />
              <div>
                <h2 className="mb-0">{trip.destination}</h2>
                <small className="opacity-75">
                  Your AI generated travel guide
                </small>
              </div>
            </div>

            {/* Time + Duration */}
            <div className="mt-4 p-4 rounded shadow bg-secondary d-md-flex gap-4">
              <div className="flex-fill">
                <h5>📅 Best Time to visit</h5>
                <p className="mb-0">{trip.best_time}</p>
              </div>

              <div className="flex-fill text-md-end">
                <h5>🕥 Recommended Duration</h5>
                <h3>{trip.duration_days} days</h3>
              </div>
            </div>

            {/* Attractions */}
            <div className="my-5 p-4 rounded shadow bg-secondary">
              <h3 className="mb-4">🏞️ Top Attractions</h3>

              <div className="row g-3">
                {trip.top_attractions.map((item, i) => (
                  <div key={i} className="col-md-4">
                    <div className="p-3 text-center rounded bg-dark border">
                      <img
                        src={location}
                        alt=""
                        style={{ width: "18px" }}
                        className="me-2"
                      />
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="p-4 my-5 rounded shadow bg-secondary">
              <h3 className="mb-4">📍 Sample Itinerary</h3>

              {trip.sample_itinerary.map((item, i) => (
                <div key={i} className="d-flex mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "45px", height: "45px" }}
                  >
                    {item.day}
                  </div>

                  <div>
                    <h5 className="mb-1">Day {item.day}</h5>
                    <p className="mb-0 opacity-75">{item.plan}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stays */}

            <div className="p-4 my-5 rounded shadow bg-secondary text-white">
              <h3 className="mb-4">🏨 Stays</h3>

              <div className="row g-4">
                {trip.stays.map((stay, index) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={index}>
                    <div className="bg-dark rounded p-3 h-100 shadow-sm">
                      <h5 className="fw-semibold">{stay.hotel_name}</h5>

                      <p className="mb-1 opacity-75">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < stay.rating ? "⭐" : "☆"}</span>
                        ))}
                      </p>

                      <p className="mb-1 opacity-75">
                        📍 {stay.distance} miles away
                      </p>

                      <p className="fw-bold">€{stay.price} / night</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="p-4 my-5 rounded shadow bg-secondary">
              <h3 className="mb-4">💰 Estimated Budget (€)</h3>

              <div className="row g-3 text-center">
                <div className="col-md-4">
                  <div className="p-3 bg-dark rounded border">
                    <p className="mb-1">Budget</p>
                    <h4>€{trip.estimated_budget_eur.low}</h4>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 bg-dark rounded border">
                    <p className="mb-1">Standard</p>
                    <h4>€{trip.estimated_budget_eur.mid}</h4>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 bg-dark rounded border">
                    <p className="mb-1">Luxury</p>
                    <h4>€{trip.estimated_budget_eur.high}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 my-5 rounded shadow bg-secondary">
              <h3 className="mb-3">💡 Local Tips</h3>

              <ul>
                {trip.local_tips.map((tip, i) => (
                  <li key={i} className="mb-2">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default TripPlanner;
