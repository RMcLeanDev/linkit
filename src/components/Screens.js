import React, { useState, useEffect } from "react";
import "../Screens.scss";
import {
  addScreenToFirebase,
  updateScreenDetails,
  removeScreenFromFirebase,
} from "../utils/firebaseActions";
import {userID} from '../actions/index';

function Screens({ playlists, screens, users }) {
  const [showAddScreenModal, setShowAddScreenModal] = useState(false);
  const [showEditScreenModal, setShowEditScreenModal] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(null);
  const [pairingCode, setPairingCode] = useState("");
  const [screenName, setScreenName] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const handleAddScreen = async () => {
    try {
      let screenSerial = null;

      Object.keys(screens).forEach((screen) => {
        const screenCheck = screens[screen];
        if (pairingCode.toUpperCase() === screenCheck.pairingCode) {
          screenSerial = screenCheck.uuid;
        }
      });
  
      if (screenSerial) {
        await addScreenToFirebase(screenSerial, userID, screenName)
        setShowAddScreenModal(false)
        setShowEditScreenModal(true);
        setCurrentScreen({deviceID: screenSerial});
      } else {
        console.error("No screen found with the provided pairing code.");
      }
    } catch (error) {
      console.error("Error adding screen:", error);
    }
  };
  

  const handleEditScreen = async () => {
    try {
      if (!currentScreen || !playlistId || !screenName) {
        console.error("Missing required data to edit screen.");
        return;
      }
  
      await updateScreenDetails(currentScreen.deviceID, playlistId, screenName, userID);
      console.log("Screen updated successfully.");
      setShowEditScreenModal(false)
    } catch (error) {
      console.error("Error updating screen:", error);
    }
  };
  

  const handleRemoveScreen = async (screen) => {
    try {
  
      const deviceID = screen.deviceID;
      const assignedPlaylist = playlists[screens[deviceID].currentPlaylistAssigned].playlistID

      console.log(deviceID)
  
      if (!window.confirm(`Are you sure you want to remove the screen "${screen.deviceName}"?`)) {
        return;
      }
  
      await removeScreenFromFirebase(deviceID, assignedPlaylist, userID);
  
      alert("Screen removed successfully!");
    } catch (error) {
      console.error("Error removing screen:", error);
      alert("Failed to remove screen. Please try again.");
    }
  };
  

  return (
    <div className="screensContainer">
      <div className="header">
        <h1>Screens</h1>
        <button
          className="addScreenButton"
          onClick={() => setShowAddScreenModal(true)}
        >
          Add Screen
        </button>
      </div>

      <div className="assignedScreens">
        {users[userID] && users[userID].devices && Object.keys(users[userID].devices).length > 0 ? (
          <table className="screensTable">
            <thead>
              <tr>
                <th>Screen Name</th>
                <th>Assigned Playlist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users[userID].devices).map((code) => {
                const screen = users[userID].devices[code];
                const screenData = screens[screen.deviceID];
                const playlistName = playlists[screenData?.currentPlaylistAssigned]?.name || "None";

                return (
                  <tr key={code}>
                    <td>{screen.deviceName || "Unnamed Screen"}</td>
                    <td>{playlistName}</td>
                    <td>
                      <button
                        className="editButton"
                        onClick={() => {
                          setCurrentScreen(screen);
                          setShowEditScreenModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="removeButton"
                        onClick={() => {
                          handleRemoveScreen(screen);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No screens have been added yet.</p>
        )}
      </div>

      {/* Add Screen Modal */}
      {showAddScreenModal && (
        <div className="modal">
          <div className="modalContent">
            <h2>Add Screen</h2>
            <input
              type="text"
              placeholder="Pairing Code"
              value={pairingCode}
              onChange={(e) => setPairingCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Screen Name"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
            />
            <button onClick={handleAddScreen}>Add</button>
            <button onClick={() => setShowAddScreenModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Screen Modal */}
      {showEditScreenModal && (
        <div className="modal">
          <div className="modalContent">
            <h2>Edit Screen</h2>
            <input
              type="text"
              placeholder="Screen Name"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
            />
            <select
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
            >
              <option value="">Select Playlist</option>
              {Object.keys(playlists || {}).map((id) => (
                <option key={id} value={id}>
                  {playlists[id].name}
                </option>
              ))}
            </select>
            <button onClick={handleEditScreen}>Save</button>
            <button onClick={() => setShowEditScreenModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Screens;
