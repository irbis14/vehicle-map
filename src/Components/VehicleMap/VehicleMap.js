import { useState, useRef } from "react";
import ReactMapGL, { NavigationControl, ScaleControl } from "react-map-gl";
import * as fetchedData from "../../fetchApi.json";
import Filter from "../Filter/Filter";
import Pins from "../Pins";

import styles from "./VehicleMap.module.css";

const mapData = fetchedData;
const vehicleData = mapData.objects;

const VehicleMap = () => {
  const [type, setType] = useState(null);

  const setMapCenter = (data) => {
    const latitudeSum = data.reduce((acc, item) => {
      return acc + item.location.latitude;
    }, 0);
    const longitudeSum = data.reduce((acc, item) => {
      return acc + item.location.longitude;
    }, 0);
    return {
      latitude: latitudeSum / data.length,
      longitude: longitudeSum / data.length,
    };
  };

  const mapCenter = setMapCenter(vehicleData);
  const [viewport, setViewport] = useState({
    ...mapCenter,
    width: "100vw",
    height: "100vh",
    zoom: 15,
  });
  const mapRef = useRef();

  return (
    <>
      {vehicleData ? (
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
          {}
          <Pins
            key={1}
            mapRef={mapRef}
            data={
              type
                ? vehicleData.filter(
                    (item) =>
                      item.type === type.value ||
                      (item.batteryLevelPct < type.value[0] &&
                        item.batteryLevelPct > type.value[1]) ||
                      item.promotion === type.value
                  )
                : vehicleData
            }
            viewport={viewport}
            setViewport={setViewport}
          />
        </ReactMapGL>
      ) : null}
      <Filter setType={setType} />
    </>
  );
};

export default VehicleMap;
