import {
  Navigate,
} from "react-router-dom";

export default function GermanyRegionPage() {
  return (
    <Navigate
      to="/regions/de"
      replace
    />
  );
}