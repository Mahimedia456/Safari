import {
  Navigate,
} from "react-router-dom";

export default function PakistanRegionPage() {
  return (
    <Navigate
      to="/regions/pk"
      replace
    />
  );
}