import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import AboutPage from "./pages/AboutPage";
import DrivePage from "./pages/DrivePage";
import FeaturesPage from "./pages/FeaturesPage";
import FoodPage from "./pages/FoodPage";
import GroceryPage from "./pages/GroceryPage";
import HomePage from "./pages/HomePage";
import MerchantsPage from "./pages/MerchantsPage";
import PharmacyPage from "./pages/PharmacyPage";
import RidePage from "./pages/RidePage";
import ServicesPage from "./pages/ServicesPage";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const timeoutId = window.setTimeout(() => {
        const target = document.querySelector(hash);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/features"
          element={<FeaturesPage />}
        />

        <Route
          path="/ride"
          element={<RidePage />}
        />

        <Route
          path="/drive"
          element={<DrivePage />}
        />

        <Route
          path="/food"
          element={<FoodPage />}
        />

        <Route
          path="/grocery"
          element={<GroceryPage />}
        />

        <Route
          path="/pharmacy"
          element={<PharmacyPage />}
        />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/merchants"
          element={<MerchantsPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}