import { createContext, useContext, useState } from "react";

const TravelContext = createContext();

const useTravelContext = () => useContext(TravelContext);
export default useTravelContext;

export const TravelProvider = ({ children }) => {
  const [trip, setTrip] = useState("");
  const [updatedTrip, setUpdatedTrip] = useState("");


  return (
    <TravelContext.Provider
      value={{ trip, setTrip, updatedTrip, setUpdatedTrip }}
    >
      {children}
    </TravelContext.Provider>
  );
};
