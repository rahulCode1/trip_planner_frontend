import styles from "./TripForm.module.css";

const TripForm = ({
  formData,
  handleOnChange,
  handleFormSubmit,
  suggestions,
  handleSetSuggestion,
  removeTripAndSuggestion,
  isLoading,
  destination,
  setDestination,
  setIsSelecting,
}) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Plan your trip</h2>
      <p className={styles.subtitle}>
        Fill in your details and we'll build the perfect itinerary.
      </p>

      <form onSubmit={handleFormSubmit}>
        {/* Destination */}
        <div className={`${styles.field} mb-3`}>
          <label className={styles.label}>Destination</label>
          <div className={styles.destWrap}>
            <input
              disabled={isLoading}
              type="text"
              name="destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setIsSelecting(false);
              }}
              placeholder="Paris, Tokyo…"
              required
              className={styles.input}
            />
            {formData.destination && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={removeTripAndSuggestion}
              >
                ✕
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((sugg, index) => (
                <p
                  key={index}
                  className={styles.suggItem}
                  onClick={() => handleSetSuggestion(sugg.place_name)}
                >
                  {sugg.place_name}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Duration + Budget */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleOnChange}
              className={styles.select}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? "day" : "days"}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Budget</label>
            <div className={styles.budgetWrap}>
              <span className={styles.currencyPrefix}>€</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleOnChange}
                placeholder="0.00"
                required
                className={`${styles.input} ${styles.budgetInput}`}
              />
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading ? "Generating…" : "Generate travel plan"}
          {isLoading && (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
