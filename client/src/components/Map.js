import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
// import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import PinIcon from "./PinIcon";
import Context from "../context";
import Blog from "./Blog";
import { GET_PINS_QUERY } from "../graphql/queries";
import { useClient } from "../client";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { Typography, Button } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const Map = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getPins();
  }, []);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "calc(100vh - 64px)",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4
  });
  const [userPosition, setUserPosition] = useState(null);
  useEffect(() => {
    getUserPosition();
  }, []);

  const [popup, setPopup] = useState(null);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY);
    console.log(getPins);
    dispatch({ type: "GET_PINS", payload: getPins });
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    console.log(lngLat);
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" });
    }
    const [longitude, latitude] = lngLat;
    console.log(longitude, latitude);
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude }
    });
  };

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isNewPin ? "limegreen" : "darkblue";
  };

  const handleSelectPin = pin => {
    setPopup(pin);
    dispatch({ type: "SET_PIN", payload: pin });
  };

  const isAuthUser = () => {
    console.log(state.currentUser._id);
    console.log(popup);
    console.log(state.currentUser._id === popup.author._id);
    return state.currentUser._id === popup.author._id;
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        {...viewport}
        onViewportChange={setViewport}
        onClick={handleMapClick}
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
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}

        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              onClick={() => handleSelectPin(pin)}
              size={40}
              color={highlightNewPin(pin)}
            />
          </Marker>
        ))}
        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img
              className={classes.popupImage}
              src={popup.image}
              alt={popup.title}
            />
            <div className={classes.popupTab}>
              <Typography>
                {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
              </Typography>
              {isAuthUser() && (
                <Button>
                  <DeleteIcon className={classes.deleteIcon} />
                </Button>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>
      <Blog />
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
