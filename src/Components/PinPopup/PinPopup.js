import { useEffect } from "react/cjs/react.development";
import { Popup } from "react-map-gl";
import styles from "./PinPopup.module.css";

const PinPopup = ({ selectedVehicle, setSelectedVehicle }) => {
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
    <Popup
      className={styles.popupBox}
      key={selectedVehicle.vehicleId}
      anchor="right"
      latitude={selectedVehicle.location.latitude}
      longitude={selectedVehicle.location.longitude}
      onClose={(e) => {
        setSelectedVehicle(null);
      }}
    >
      <div className={styles.popupBox}>
        <h1 className={styles.popupTitle}>{selectedVehicle.type}</h1>
        <p className={styles.popupText}>
          Name: <span>{selectedVehicle.name}</span>
        </p>
        <p className={styles.popupText}>
          Battery: <span>{selectedVehicle.batteryLevelPct}%</span>
        </p>
        <p className={styles.popupText}>
          Status: <span>{selectedVehicle.status}</span>
        </p>
        <p className={styles.popupText}>
          Promotion:
          <span>
            {selectedVehicle.promotion ? selectedVehicle.promotion : " No"}
          </span>
        </p>
      </div>
    </Popup>
  );
};

export default PinPopup;
