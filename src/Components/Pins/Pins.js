import { Marker } from "react-map-gl";
// import marker from "../../image/marker.svg";
import marker from "../../image/car.svg";
import styles from "./Pins.module.css";

const Pins = ({ data, setSelectedVehicle }) => {
  return data.objects.map((item) => {
    return (
      <Marker
        key={item.id}
        latitude={item.location.latitude}
        longitude={item.location.longitude}
      >
        <button
          className={styles.iconBox}
          onClick={(e) => {
            e.preventDefault();
            setSelectedVehicle(item);
          }}
        >
          <img className={styles.icon} src={marker} alt="Vehicle Icon" />
        </button>
      </Marker>
    );
  });
};

export default Pins;
