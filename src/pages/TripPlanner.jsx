import axios from "axios";
import { useEffect, useState } from "react";
import TripPlan from "../component/TripPlan";
import useTravelContext from "../context/TravelContext";
import { toast } from "react-toastify";
import TripForm from "../component/TripForm";
import styles from "./TripPlanner.module.css";

const TripPlanner = () => {
  const initialState = {
    duration: "",
    budget: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const { trip, setTrip } = useTravelContext();

  

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (trip) {
      setTrip("");
    }

    const toastId = toast.loading("Generating trip...");
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/travel-planner?destination=${destination}&duration=${formData.duration}&budget=${formData.budget}`,
      );

      setTrip(res.data?.trip);
      toast.update(toastId, {
        autoClose: 4000,
        render: "Travel plan created successfully",
        type: "success",
        isLoading: false,
      });
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.update(toastId, {
        autoClose: 4000,
        render: err.response?.data?.message || "Failed to create Travel plan.",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleShowAutoSuggestion = async () => {
      if (isSelecting) {
        return;
      }

      

      if (!destination) {
        return setSuggestions([]);
      }

      const delay = setTimeout(async () => {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?autocomplete=true&types=place,country&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
        );

        setSuggestions(res.data?.features);
      }, 500);

      return () => clearTimeout(delay);
    };

    handleShowAutoSuggestion();
  }, [destination, isSelecting ]);

  

  const handleSetSuggestion = (suggestion) => {
    setDestination(suggestion);
    setSuggestions([]);
    setIsSelecting(true);
  };

  const removeTripAndSuggestion = () => {
    setDestination("");
    setSuggestions([]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.planLayout}>
          <TripForm
            formData={formData}
            handleFormSubmit={handleFormSubmit}
            handleOnChange={handleOnChange}
            handleSetSuggestion={handleSetSuggestion}
            isLoading={isLoading}
            removeTripAndSuggestion={removeTripAndSuggestion}
            suggestions={suggestions}
            setIsSelecting={setIsSelecting}
            setDestination={setDestination}
            destination={destination}
          />

          {trip && <TripPlan trip={trip} />}
        </div>
      </div>
    </main>
  );
};

export default TripPlanner;
