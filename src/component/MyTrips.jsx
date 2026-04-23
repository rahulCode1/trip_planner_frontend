import { Link } from "react-router-dom";
import styles from "./MyTrips.module.css";

const MyTrips = ({ trips }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My <span className={styles.accent}>trips</span>
        </h1>
        <span className={styles.count}>{trips?.length ?? 0} trips</span>
      </div>

      {trips && trips.length > 0 ? (
        trips.map((trip, i) => (
          <Link key={trip.id} to={`${trip.id}`} className={styles.tripCard}>
            <div className={styles.num}>{i + 1}</div>
            <div className={styles.info}>
              <p className={styles.dest}>{trip.destination}</p>
              <span className={styles.dur}>
                {trip.duration_days} day{trip.duration_days !== 1 ? "s" : ""}
              </span>
            </div>
            <span className={`${styles.badge} ${trip.isTripComplete ? styles.done : styles.wip}`}>
              {trip.isTripComplete ? "Completed" : "In progress"}
            </span>
            <span className={styles.chevron}>›</span>
          </Link>
        ))
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No trips yet</p>
          <p className={styles.emptySub}>Plan your first adventure to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MyTrips;