import {
  Link,
  useLocation,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import locationImg from "../imgs/location.png";
import api from "../utils/api";
import { useState } from "react";
import { loadingToast, successToast, toastError } from "../utils/toast.js";
import ModelOverlay from "./model/ModelOverlay.jsx";
import useTravelContext from "../context/TravelContext.jsx";
import styles from "./TripDetails.module.css";

const TripDetails = ({ trip }) => {
  const initialState = { destination: "", duration: "", budget: "" };
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMarkLoading, setIsMarkLoading] = useState(false);
  const { updatedTrip, setUpdatedTrip } = useTravelContext();
  const location = useLocation();
  const backUrl = location.state?.from || "..";
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const getPersentValue = (total, persent) =>
    Math.floor((total / 100) * persent);

  const handleDeleteTrip = async (tripId) => {
    const toastId = loadingToast("Deleting trip...");
    try {
      const res = await api.delete(`/api/${tripId}`);
      successToast(toastId, res.data?.message || "Trip deleted successfully");
      return navigate(location.state?.from || "/myTrips");
    } catch (error) {
      toastError(
        toastId,
        error?.response?.data?.message || "Failed to delete trip.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdateTrip = async (e) => {
    e.preventDefault();
    const toastId = loadingToast("Generating trip...");
    try {
      setIsLoading(true);
      const res = await api.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-trip/${trip.id}`,
        {
          destination: formData.destination,
          duration: formData.duration,
          budget: formData.budget
        }
      );
      setUpdatedTrip(res.data?.updatedTrip);
      setModelOpen(false);
      successToast(toastId, res.data?.message || "Trip updated successfully");
    } catch (err) {
      toastError(toastId, {
        autoClose: 4000,
        render: "Failed to update trip.",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModelToUpdate = () => {
    setModelOpen(true);
    setFormData({
      destination: trip.destination,
      duration: trip.duration_days,
      budget: trip.estimated_budget_eur.low,
    });
  };

  const handleSaveUpdateTrip = async () => {
    const toastId = loadingToast("Saving updated trip...");
    try {
      setIsSaving(true);
      const res = await api.patch(
        `/api/save-updated-trip/${trip.id}`,
        updatedTrip,
      );
      setUpdatedTrip("");
      revalidator.revalidate();
      successToast(
        toastId,
        res.data?.message || "Updated trip saved successfully.",
      );
    } catch (error) {
      toastError(toastId, {
        autoClose: 4000,
        render: "Failed to save updated trip.",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateTripStatus = async () => {
    const toastId = loadingToast("Trip Marking as complete...");
    try {
      setIsMarkLoading(true);
      const res = await api.patch(`/api/${trip.id}/mark-complete`);

      revalidator.revalidate();
      successToast(
        toastId,
        res.data?.message || "Trip marked as completed successfully.",
      );
    } catch (error) {
      toastError(toastId, {
        autoClose: 4000,
        render: "Failed to  updated trip status.",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsMarkLoading(false);
    }
  };

  /* ── Reusable trip panel ── */
  const TripCard = ({ data, isUpdated = false }) => (
    <div className="d-flex flex-column gap-3">
      {/* Panel label */}
      <span className={isUpdated ? styles.labelUpdated : styles.labelOriginal}>
        {isUpdated ? "✨ Updated Trip" : "📋 Original Trip"}
      </span>

      {/* Header */}
      <div style={{ position: "relative" }}>
  <div className={`${styles.sectionCard} d-flex align-items-center gap-3`}>
    <div className={styles.headerIcon}>
      <img src={locationImg} alt="" style={{ width: 20 }} />
    </div>
    <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row flex-grow-1 gap-2">
      <div className="flex-grow-1">
        <h2 className="mb-0 fw-bold text-white" style={{ fontSize: 20 }}>
          {data.destination}
        </h2>
        <small className="text-secondary">AI generated travel guide</small>
      </div>
      <p
        style={{
          backgroundColor: data?.isTripComplete ? "green" : "red",
          whiteSpace: "nowrap",
          margin: 0,
        }}
        className="text-light badge"
      >
        {data?.isTripComplete ? "Completed" : "Not complete yet"}
      </p>
    </div>
  </div>
</div>

      {/* Best time + duration */}
      <div className={`${styles.sectionCard} d-flex align-items-center gap-3`}>
        <div className="d-flex align-items-start gap-2 flex-fill">
          <span style={{ fontSize: 16, marginTop: 2 }}>📅</span>
          <div>
            <p className={styles.metaLabel}>Best time to visit</p>
            <p className={styles.metaValue}>{data.best_time}</p>
          </div>
        </div>
        <div className={styles.metaDivider} />
        <div className="d-flex align-items-start gap-2 flex-fill justify-content-end text-end">
          <div>
            <p className={styles.metaLabel}>Recommended duration</p>
            <p className={`${styles.metaValue} ${styles.metaBig}`}>
              {data.duration_days} days
            </p>
          </div>
          <span style={{ fontSize: 16, marginTop: 2 }}>🕥</span>
        </div>
      </div>

      {/* Attractions */}
      <div className={styles.sectionCard}>
        <h3 className="text-white fw-semibold mb-3" style={{ fontSize: 15 }}>
          🏞️ Top Attractions
        </h3>
        <div className="d-flex flex-wrap gap-2">
          {data.top_attractions.map((item, i) => (
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
        <h3 className="text-white fw-semibold mb-3" style={{ fontSize: 15 }}>
          📍 Itinerary
        </h3>
        {data.sample_itinerary.map((item, i) => (
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
        <h3 className="text-white fw-semibold mb-3" style={{ fontSize: 15 }}>
          🏨 Stays
        </h3>
        <div className="row g-2">
          {data.stays.map((stay, i) => (
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
                <p className="fw-bold text-white mb-0" style={{ fontSize: 14 }}>
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
        <h3 className="text-white fw-semibold mb-3" style={{ fontSize: 15 }}>
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
                  €{data.estimated_budget_eur[key]}
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
                    €{getPersentValue(data.estimated_budget_eur[key], 30)}
                  </td>
                  <td>
                    €{getPersentValue(data.estimated_budget_eur[key], 25)}
                  </td>
                  <td>
                    €{getPersentValue(data.estimated_budget_eur[key], 15)}
                  </td>
                  <td>
                    €{getPersentValue(data.estimated_budget_eur[key], 15)}
                  </td>
                  <td>
                    €{getPersentValue(data.estimated_budget_eur[key], 15)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local tips */}
      <div className={styles.sectionCard}>
        <h3 className="text-white fw-semibold mb-3" style={{ fontSize: 15 }}>
          💡 Local Tips
        </h3>
        <ul className={styles.tipsList}>
          {data.local_tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Action button */}
      {isUpdated && (
        <button
          disabled={isSaving}
          onClick={handleSaveUpdateTrip}
          className={`btn w-100 py-3 fw-semibold ${styles.btnSave}`}
        >
          {isSaving ? "Saving…" : "💾 Save Updated Trip"}
          {isSaving && (
            <span className="spinner-border spinner-border-sm ms-2" />
          )}
        </button>
      )}
      {/* <div>
           {!data?.isTripComplete && (
             <button
               onClick={handleUpdateTripStatus}
               disabled={data?.isTripComplete || isMarkLoading}
               className="w-100 btn text-light bg-primary mb-3"
             >
               {isMarkLoading ? "Updating..." : "✅ Mark as complete"}
               {isMarkLoading && (
                 <span className="spinner-border spinner-border-sm ms-2" />
               )}
             </button>
           )}
         </div> */}
    </div>
  );

  return (
    <main className="min-vh-100 bg-dark pt-3 pt-md-4">
      {/* Sticky topbar */}
      <div className={`${styles.topbar} px-3 py-2`}>
        <div className="container-fluid d-flex align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-3">
            <Link
              to={backUrl}
              className="btn btn-sm btn-secondary text-decoration-none"
            >
              ← Back
            </Link>
            {updatedTrip && (
              <div className="d-none d-sm-block">
                <p className={styles.topbarTitle}>Comparing trips</p>
                <p className={styles.topbarSubtitle}>Original · Updated</p>
              </div>
            )}
          </div>
          <button
            onClick={handleOpenModelToUpdate}
            className="btn btn-sm btn-primary"
          >
            ✏️ Edit Trip
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModelOpen && (
        <ModelOverlay title="Update trip" onClose={() => setModelOpen(false)}>
          <form onSubmit={handleUpdateTrip}>
            <div className="row g-3 mb-3">
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
                    <option value={i + 1} key={i}>
                      {i + 1} day{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Budget (€)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleOnChange}
                className="form-control"
                placeholder="Enter your budget"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Generating…" : "Generate new Travel Plan"}
              {isLoading && (
                <span className="spinner-border spinner-border-sm ms-2" />
              )}
            </button>
          </form>
        </ModelOverlay>
      )}

      {/* Content — split or single */}
      <div className="container-fluid py-4 pb-5">
        {updatedTrip ? (
          <>
            <p className={styles.swipeHint}>← swipe to compare →</p>

            <div className={styles.splitScroller}>
              <div className={styles.splitRow}>
                <div className={styles.splitPanel}>
                  <TripCard data={trip} isUpdated={false} />
                  <button
                    onClick={() => setUpdatedTrip("")}
                    className="w-100 my-3 btn btn-secondary "
                  >
                    Keep Original
                  </button>
                </div>

                <div className={styles.splitPanel}>
                  <TripCard data={updatedTrip} isUpdated={true} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`${styles.singleWrap} px-2`}>
            <TripCard data={trip} isUpdated={false} />

            {!trip.isTripComplete && (
              <button
                onClick={handleUpdateTripStatus}
                disabled={trip?.isTripComplete || isMarkLoading}
                className="w-100 my-3 btn text-light bg-primary mb-3"
              >
                {isMarkLoading ? "Updating..." : "✅ Mark as complete"}
                {isMarkLoading && (
                  <span className="spinner-border spinner-border-sm ms-2" />
                )}
              </button>
            )}

            <button
              disabled={isLoading}
              onClick={() => handleDeleteTrip(trip.id)}
              className={`btn w-100 py-3 my-3 fw-semibold ${styles.btnDelete}`}
            >
              {isLoading ? "Deleting…" : "🗑 Delete Trip "}
              {isLoading && (
                <span className="spinner-border spinner-border-sm ms-2" />
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default TripDetails;
