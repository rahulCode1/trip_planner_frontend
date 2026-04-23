import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import TripPlanner from "./pages/TripPlanner";
import LoginPage from "./pages/LoginPage";
import VerifyLogin from "./pages/VerifyLogin";
import { TravelProvider } from "./context/TravelContext";
import MyTripsPage, { loader as savedTripLoader } from "./pages/MyTripsPage";
import TripDetailsPage, {
  loader as tripDetailsLoader,
} from "./pages/TripDetailsPage";
import ProctectRoutes from "./component/ProctectRoutes";
import LocationSearch from "./pages/LocationSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TripPlanner />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "v1/profile/google",
        element: <VerifyLogin />,
      },
      {
        path: "location",
        element: <LocationSearch />,
      },
      {
        path: "myTrips",
        children: [
          {
            index: true,
            element: (
              <ProctectRoutes>
                <MyTripsPage />
              </ProctectRoutes>
            ),
            loader: savedTripLoader,
          },
          {
            path: ":id",
            element: (
              <ProctectRoutes>
                <TripDetailsPage />
              </ProctectRoutes>
            ),
            loader: tripDetailsLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <TravelProvider>
      <RouterProvider router={router} />
    </TravelProvider>
  );
}

export default App;
