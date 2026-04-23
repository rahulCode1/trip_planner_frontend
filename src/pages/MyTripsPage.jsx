import api from "../utils/api";
import MyTrips from "../component/MyTrips";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../component/LoadingSpinner";
import styles from "./MyTripsPage.module.css";

const MyTripsPage = () => {
  const { trips } = useLoaderData();

  return (
    <main className={styles.main}>
      <div className="py-2">
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={trips}>
            {(isTripsLoad) => <MyTrips trips={isTripsLoad.savedTrips} />}
          </Await>
        </Suspense>
      </div>
    </main>
  );
};

export default MyTripsPage;

const trips = async () => {
  try {
    const res = await api.get("/api/saved-trip");

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loader = async ({ req }) => {
  return {
    trips: trips(),
  };
};
