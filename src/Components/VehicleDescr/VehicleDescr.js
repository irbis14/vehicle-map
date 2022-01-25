import { useEffect } from "react";
import styles from "./VehicleDescr.module.css";

const VehicleDescr = ({ selectedVehicle, setSelectedVehicle }) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedVehicle(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <h1>{selectedVehicle.type}</h1>
      <p>Name: {selectedVehicle.name}</p>
      <p>Battery: {selectedVehicle.batteryLevelPct}%</p>
      <p>Status: {selectedVehicle.status}</p>
      <p>
        Promotion:{selectedVehicle.promotion ? selectedVehicle.promotion : "No"}
      </p>
    </div>
  );
};

export default VehicleDescr;
