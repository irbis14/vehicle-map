import { useEffect, useState } from "react";
import VehicleMap from "./Components/VehicleMap";
// import * as mapData from "./fetchApi.json";
import { RevolvingDot } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const BASE_URL =
  "https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE";
// const CORS_URL = "https://newsuperserver.herokuapp.com/";

function App() {
  // const [mapData, setMapData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  /*  const fetchMapData = async () => {
    try {
      const response = await axios.get("fetchedData.json");
      // const data = response.json();
      setMapData(response);
      setIsLoading(false);
      console.log(mapData);
    } catch (error) {
      console.log(error.message);
    }
  }; */

  useEffect(() => {
    setIsLoading(true);
    // fetchMapData();
  }, []);

  return (
    <div className="App">
      <VehicleMap />

      {/* {isLoading ? (
        <RevolvingDot
          // className={styles.loader}
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <VehicleMap />
      )} */}
    </div>
  );
}

export default App;
