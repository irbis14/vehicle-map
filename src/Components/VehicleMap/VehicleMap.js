import { useState } from "react";
import ReactMapGL, {
  Popup,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import * as mapData from "../../fetchApi.json";
// import marker from "../../image/marker.svg";
// import marker from "../../image/car.svg";
import Pins from "../Pins";
import VehicleDescr from "../VehicleDescr";

import styles from "./VehicleMap.module.css";

const vehicleData = mapData;

const VehicleMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 52.19,
    longitude: 20.93,
    width: "100vw",
    height: "100vh",
    zoom: 15,
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/irbis14/ckyt5el0h000015mznp7deppe"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      <NavigationControl />
      <ScaleControl className={styles.scaleControl} />
      <Pins data={vehicleData} setSelectedVehicle={setSelectedVehicle} />

      {selectedVehicle ? (
        <Popup
          anchor="right"
          latitude={selectedVehicle.location.latitude}
          longitude={selectedVehicle.location.longitude}
          onClose={(e) => {
            setSelectedVehicle(null);
          }}
        >
          <VehicleDescr
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default VehicleMap;
