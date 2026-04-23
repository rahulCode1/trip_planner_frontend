import { useState } from "react";
import locationImg from "../imgs/location.png";
import api from "../utils/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./TripDetails.module.css";

const TripPlan = ({ trip }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSaveTrip = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first.");
      return navigate("/login");
    }

    setIsLoading(true);
    const toastId = toast.loading("Saving trip...");
    try {
      const res = await api.post(`/api/save-trip`, trip);

      setSearchParams({ tripId: res.data?.savedTrip?.id });
      toast.update(toastId, {
        render: res.data?.message || "Trip saved successfully.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to save trip.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPersentValue = (total, persent) => {
    const result = (total / 100) * persent;
    return Math.floor(result);
  };

  return (
    <>
      <section className="mt-5">
        <div className="d-flex flex-column gap-3">
          {/* Header */}
          <div
            className={`${styles.sectionCard} d-flex align-items-center gap-3`}
          >
            <div className={styles.headerIcon}>
              <img src={locationImg} alt="" style={{ width: 20 }} />
            </div>
            <div>
              <h2 className="mb-0 fw-bold text-white" style={{ fontSize: 20 }}>
                {trip.destination}
              </h2>
              <small className="text-secondary">
                AI generated travel guide
              </small>
            </div>
          </div>

          {/* Best time + duration */}
          <div
            className={`${styles.sectionCard} d-flex align-items-center gap-3`}
          >
            <div className="d-flex align-items-start gap-2 flex-fill">
              <span style={{ fontSize: 16, marginTop: 2 }}>📅</span>
              <div>
                <p className={styles.metaLabel}>Best time to visit</p>
                <p className={styles.metaValue}>{trip.best_time}</p>
              </div>
            </div>
            <div className={styles.metaDivider} />
            <div className="d-flex align-items-start gap-2 flex-fill justify-content-end text-end">
              <div>
                <p className={styles.metaLabel}>Recommended duration</p>
                <p className={`${styles.metaValue} ${styles.metaBig}`}>
                  {trip.duration_days} days
                </p>
              </div>
              <span style={{ fontSize: 16, marginTop: 2 }}>🕥</span>
            </div>
          </div>

          {/* Attractions */}
          <div className={styles.sectionCard}>
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: 15 }}
            >
              🏞️ Top Attractions
            </h3>
            <div className="d-flex flex-wrap gap-2">
              {trip.top_attractions.map((item, i) => (
                <span key={i} className={styles.attractionChip}>
                  <img
                    src={locationImg}
                    alt=""
                    style={{ width: 12, opacity: 0.6 }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className={styles.sectionCard}>
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: 15 }}
            >
              📍 Itinerary
            </h3>
            {trip.sample_itinerary.map((item, i) => (
              <div
                key={i}
                className={`${styles.itineraryRow} d-flex align-items-start gap-3 py-2`}
              >
                <div className={styles.dayBadge}>{item.day}</div>
                <div>
                  <p
                    className="mb-1 fw-semibold text-white"
                    style={{ fontSize: 13 }}
                  >
                    Day {item.day}
                  </p>
                  <p className={styles.dayPlan}>{item.plan}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stays */}
          <div className={styles.sectionCard}>
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: 15 }}
            >
              🏨 Stays
            </h3>
            <div className="row g-2">
              {trip.stays.map((stay, i) => (
                <div key={i} className="col-12 col-sm-6">
                  <div className={styles.stayCard}>
                    <p
                      className="fw-semibold text-white mb-1"
                      style={{ fontSize: 13 }}
                    >
                      {stay.hotel_name}
                    </p>
                    <p className="mb-1" style={{ fontSize: 11 }}>
                      {[...Array(5)].map((_, j) => (
                        <span
                          key={j}
                          style={{ opacity: j < stay.rating ? 1 : 0.25 }}
                        >
                          ⭐
                        </span>
                      ))}
                    </p>
                    <p className="mb-1 text-secondary" style={{ fontSize: 11 }}>
                      📍 {stay.distance} miles away
                    </p>
                    <p
                      className="fw-bold text-white mb-0"
                      style={{ fontSize: 14 }}
                    >
                      €{stay.price}{" "}
                      <span
                        className="fw-normal text-secondary"
                        style={{ fontSize: 11 }}
                      >
                        /night
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className={styles.sectionCard}>
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: 15 }}
            >
              💰 Estimated Budget (€)
            </h3>

            {/* Tier summary */}
            <div className="row g-2 mb-3">
              {[
                { label: "Budget", key: "low", color: "#22c55e" },
                { label: "Standard", key: "mid", color: "#3b82f6" },
                { label: "Luxury", key: "high", color: "#a855f7" },
              ].map(({ label, key, color }) => (
                <div key={key} className="col-4">
                  <div
                    className={styles.budgetTier}
                    style={{ borderTop: `3px solid ${color}` }}
                  >
                    <p className={styles.tierLabel}>{label}</p>
                    <p className={styles.tierAmount}>
                      €{trip.estimated_budget_eur[key]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown table */}
            <div className={styles.budgetTableWrap}>
              <table className={styles.budgetTable}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Stay</th>
                    <th>Food</th>
                    <th>Transit</th>
                    <th>Activities</th>
                    <th>Misc</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Budget", key: "low" },
                    { label: "Standard", key: "mid" },
                    { label: "Luxury", key: "high" },
                  ].map(({ label, key }) => (
                    <tr key={key}>
                      <td>
                        <strong className="text-white">{label}</strong>
                      </td>
                      <td>
                        €{getPersentValue(trip.estimated_budget_eur[key], 30)}
                      </td>
                      <td>
                        €{getPersentValue(trip.estimated_budget_eur[key], 25)}
                      </td>
                      <td>
                        €{getPersentValue(trip.estimated_budget_eur[key], 15)}
                      </td>
                      <td>
                        €{getPersentValue(trip.estimated_budget_eur[key], 15)}
                      </td>
                      <td>
                        €{getPersentValue(trip.estimated_budget_eur[key], 15)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Local tips */}
          <div className={styles.sectionCard}>
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: 15 }}
            >
              💡 Local Tips
            </h3>
            <ul className={styles.tipsList}>
              {trip.local_tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            disabled={isLoading}
            onClick={handleSaveTrip}
            className="w-100 btn text-light bg-primary"
          >
            {isLoading ? "Saving..." : "Save trip"}
            {isLoading && (
              <span className="spinner-border spinner-border-sm ms-3"></span>
            )}
          </button>
          {tripId && (
            <Link
              to={`/myTrips/${tripId}`}
              state={{ from: "/" }}
              className="btn btn-secondary w-100 mt-3"
            >
              Go to Saved trips
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default TripPlan;
