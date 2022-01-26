import { useState, useRef } from "react";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
  Layer,
} from "react-map-gl";
import * as mapData from "../../fetchApi.json";
// import marker from "../../image/marker.svg";
// import marker from "../../image/car.svg";
import Pins from "../Pins";

import styles from "./VehicleMap.module.css";

const vehicleData = mapData;

const setMapCenter = (data) => {
  const latitudeSum = data.objects.reduce((acc, item, index, array) => {
    return acc + item.location.latitude;
  }, 0);
  const longitudeSum = data.objects.reduce((acc, item, index, array) => {
    return acc + item.location.longitude;
  }, 0);
  return {
    latitude: latitudeSum / data.objects.length,
    longitude: longitudeSum / data.objects.length,
  };
};

const VehicleMap = () => {
  const mapCenter = setMapCenter(vehicleData);
  const [viewport, setViewport] = useState({
    ...mapCenter,
    width: "100vw",
    height: "100vh",
    zoom: 15,
  });
  const mapRef = useRef();

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/irbis14/ckyvqk8gl004415phia5ztuxp"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      ref={mapRef}
    >
      <NavigationControl />
      <ScaleControl className={styles.scaleControl} />
      <Pins
        mapRef={mapRef}
        data={vehicleData}
        viewport={viewport}
        setViewport={setViewport}
      />
    </ReactMapGL>
  );
};

export default VehicleMap;
