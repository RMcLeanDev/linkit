import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import MobileFooter from "./components/MobileFooter";
import PlaylistMain from "./components/Playlists/PlaylistMain";
import Screens from "./components/Screens/Screens";
import Home from "./components/Home";
import Login from "./components/Login";
import DevicesMain from "./components/Devices/DevicesMain";
import VenuesMain from "./components/Venues/VenuesMain";
import DisplayVenue from "./components/Venues/DisplayVenue";
import Files from "./components/Files/Files";

function App(props) {
  let display;
  console.log(props)
  if (props.authUser) {
    display = (
      <div>
        <MobileFooter changeLog={props.db} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/screens" element={<Screens />} />
          <Route exact path="/playlists" element={<PlaylistMain />} />
          <Route exact path="/devices" element={<DevicesMain />} />
          <Route exact path="/venues" element={<VenuesMain />} />
          <Route exact path="/venues/:id" element={<DisplayVenue />} />
          <Route exact path="/files"  element={<Files />}/>
        </Routes>
      </div>
    );
  } else if (props.authUser === false) {
    display = <Login />;
  } else {
    display = <div>Loading...</div>;
  }

  return <div className="App">{display}</div>;
}

const mapStateToProps = (state) => ({
  authUser: state.authState
});

export default connect(mapStateToProps)(App);
