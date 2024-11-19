import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import MobileFooter from "./components/MobileFooter";
import Playlist from "./components/Playlist";
import Screens from "./components/Screens";
import Home from "./components/Home";
import Login from "./components/Login";
import DevicesMain from "./components/Devices/DevicesMain";
import VenuesMain from "./components/Venues/VenuesMain";
import DisplayVenue from "./components/Venues/DisplayVenue";
import SupportRequest from "./components/SupportRequest";

function App(props) {
  let display;

  if (props.authUser && props.db) {
    display = (
      <div>
        <MobileFooter changeLog={props.db} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/screens" element={<Screens playlists={props.db.playlists} />} />
          <Route exact path="/playlists" element={<Playlist playlists={props.db.playlists} />} />
          <Route exact path="/devices" element={<DevicesMain devices={props.db.devices} />} />
          <Route exact path="/venues" element={<VenuesMain venues={props.db.venues} />} />
          <Route exact path="/venues/:id" element={<DisplayVenue venues={props.db.venues} />} />
          <Route exact path="/supportRequest" element={<SupportRequest />} />
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
  authUser: state.authState,
  db: state.dbState,
});

export default connect(mapStateToProps)(App);
