import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
// import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PinIcon from "./PinIcon";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "calc(100vh - 64px)",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4
  });
  const [userPosition, setUserPosition] = useState(null);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        {...viewport}
        onViewportChange={setViewport}
      >
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={setViewport} />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
