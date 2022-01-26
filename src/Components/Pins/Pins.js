import { FlyToInterpolator, Marker } from "react-map-gl";
import { useState } from "react/cjs/react.development";
import useSupercluster from "use-supercluster";
import marker from "../../image/car.svg";
import PinPopup from "../PinPopup/PinPopup";
import styles from "./Pins.module.css";

const Pins = ({ mapRef, data, viewport, setViewport }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const points = data.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      vehicleId: item.id,
      type: item.type,
      status: item.status,
      name: item.name,
      batteryLevelPct: item.batteryLevelPct,
      promotion: item.promotion,
      location: item.location,
    },
    geometry: {
      type: "Point",
      coordinates: [item.location.longitude, item.location.latitude],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  });

  return clusters.map((cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCluster } =
      cluster.properties;

    if (isCluster) {
      return (
        <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
          <div
            className={styles.clusterMarker}
            onClick={() => {
              const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(cluster.id),
                20
              );
              setViewport({
                ...viewport,
                latitude,
                longitude,
                zoom: expansionZoom,
                transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
                transitionDuration: "auto",
              });
            }}
          >
            {pointCluster}
          </div>
        </Marker>
      );
    }
    return (
      <>
        <Marker
          key={cluster.properties.cluster_id}
          latitude={latitude}
          longitude={longitude}
          offsetTop={-10}
          size={100}
        >
          <button
            className={styles.iconBox}
            onClick={(e) => {
              e.preventDefault();
              setSelectedVehicle(cluster.properties);
            }}
          >
            <img
              className={styles.icon}
              src={marker}
              alt="Vehicle Icon"
              width={viewport.zoom * 5}
              height={viewport.zoom * 5}
            />
          </button>
        </Marker>
        {selectedVehicle ? (
          <PinPopup
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
        ) : null}
      </>
    );
  });
};

export default Pins;
