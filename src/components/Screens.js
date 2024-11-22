import React, { useState, useEffect } from "react";
import "../Screens.scss";
import {
  getScreensFromFirebase,
  addScreenToFirebase,
  updateScreenDetails,
  removeScreenFromFirebase,
} from "../utils/firebaseActions";

function Screens({ playlists }) {
  const [assignedScreens, setAssignedScreens] = useState({});
  const [showAddScreenModal, setShowAddScreenModal] = useState(false);
  const [showEditScreenModal, setShowEditScreenModal] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(null);
  const [pairingCode, setPairingCode] = useState("");
  const [screenName, setScreenName] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  // Fetch screens from Firebase
  useEffect(() => {
    const fetchScreens = async () => {
      const screens = await getScreensFromFirebase();
      setAssignedScreens(screens || {});
    };
    fetchScreens();
  }, []);

  // Add a new screen
  const handleAddScreen = async () => {
    if (!pairingCode.trim()) {
      alert("Please enter a pairing code.");
      return;
    }
    const screenData = {
      name: screenName || "Unnamed Screen",
      playlistId: null,
    };
    try {
      await addScreenToFirebase(pairingCode, screenData);
      alert("Screen added successfully!");
      setAssignedScreens((prev) => ({
        ...prev,
        [pairingCode]: screenData,
      }));
      setShowAddScreenModal(false);
      setPairingCode("");
      setScreenName("");
    } catch (error) {
      console.error("Error adding screen:", error);
      alert("Failed to add screen. Please try again.");
    }
  };

  // Edit an existing screen
  const handleEditScreen = async () => {
    if (!currentScreen) return;
    try {
      await updateScreenDetails(currentScreen, { name: screenName, playlistId });
      alert("Screen updated successfully!");
      setAssignedScreens((prev) => ({
        ...prev,
        [currentScreen]: {
          ...prev[currentScreen],
          name: screenName,
          playlistId,
        },
      }));
      setShowEditScreenModal(false);
      setScreenName("");
      setPlaylistId("");
    } catch (error) {
      console.error("Error updating screen:", error);
      alert("Failed to update screen. Please try again.");
    }
  };

  // Remove a screen
  const handleRemoveScreen = async (pairingCode) => {
    if (window.confirm("Are you sure you want to remove this screen?")) {
      try {
        // Call the Firebase function to remove the screen
        await removeScreenFromFirebase(pairingCode);

        // Update local state to reflect the removal
        setAssignedScreens((prev) => {
          const updatedScreens = { ...prev };
          delete updatedScreens[pairingCode];
          return updatedScreens;
        });

        alert("Screen removed successfully!");
      } catch (error) {
        console.error("Error removing screen:", error);
        alert("Failed to remove screen. Please try again.");
      }
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
        {Object.keys(assignedScreens).length > 0 ? (
          <table className="screensTable">
            <thead>
              <tr>
                <th>Screen Name</th>
                <th>Assigned Playlist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(assignedScreens).map((code) => {
                const screen = assignedScreens[code];
                return (
                  <tr key={code}>
                    <td>{screen.name || "Unnamed Screen"}</td>
                    <td>{playlists[screen.playlistId]?.name || "None"}</td>
                    <td>
                      <button
                        className="editButton"
                        onClick={() => {
                          setCurrentScreen(code);
                          setScreenName(screen.name);
                          setPlaylistId(screen.playlistId || "");
                          setShowEditScreenModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="removeButton"
                        onClick={() => handleRemoveScreen(code)}
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
