import React from "react";
import withRoot from "./withRoot";
import logo from "./logo.svg";
import Header from "./components/Header";
import Map from "./components/Map";

function App() {
  return (
    <>
      <Header />
      <Map />

      {/* <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
    </>
  );
}

export default withRoot(App);
