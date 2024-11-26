import React, { useState } from "react";
import { FiEdit } from "react-icons/fi"; // Import pencil icon
import "../Playlist.scss";
import { addNewItem, removeItem, updatePlaylistName, createNewPlaylist } from "../utils/firebaseActions";
import {userID} from '../actions/index';

function Playlist({ playlists }) {
  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [newPlaylistFormName, setNewPlaylistFormName] = useState("");

  // Start editing the playlist name
  const startEditingName = (playlistId, currentName) => {
    setEditingName(true);
    setNewPlaylistName(currentName);
    setCurrentPlaylistId(playlistId);
  };

  const saveNewName = () => {
    if (currentPlaylistId && newPlaylistName.trim() !== "") {
      updatePlaylistName(currentPlaylistId, newPlaylistName.trim(), userID)
        .then(() => {
          console.log("Playlist name updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating playlist name:", error);
        });
    }
    setEditingName(false);
  };

  const handleCreateNewPlaylist = () => {
    if (newPlaylistFormName.trim() !== "") {
      const newPlaylist = {
        name: newPlaylistFormName.trim(),
        assignedTo: userID,
        items: {},
      };
      createNewPlaylist(newPlaylist)
        .then(() => {
          console.log("New playlist created successfully.");
          setNewPlaylistFormName("");
        })
        .catch((error) => {
          console.error("Failed to create new playlist:", error);
        });
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    const type = e.target.type.value;
    const url = e.target.url.value;
    const duration = parseInt(e.target.duration.value, 10);

    if (type && url && duration && currentPlaylistId) {
      console.log("Adding new item:", { type, url, duration });
      addNewItem(currentPlaylistId, { type, url, duration }, userID)
        .then(() => {
          console.log("Item added successfully.");
        })
        .catch((error) => {
          console.error("Failed to add new item:", error);
        });
      e.target.reset();
    } else {
      console.error("Invalid input for adding a new item.");
    }
  };

  return (
    <div className="playlistContainer">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Playlists</h3>
        <ul>
          {Object.keys(playlists).map((playlistId) => (
            <li
              key={playlistId}
              className={currentPlaylistId === playlistId ? "activePlaylist" : ""}
              onClick={() => setCurrentPlaylistId(playlistId)}
            >
              {playlists[playlistId].name}
            </li>
          ))}
        </ul>

        {/* Add New Playlist */}
        <div className="addPlaylist">
          <h3>Create New Playlist</h3>
          <input
            type="text"
            placeholder="New Playlist Name"
            value={newPlaylistFormName}
            onChange={(e) => setNewPlaylistFormName(e.target.value)}
          />
          <button onClick={handleCreateNewPlaylist}>Create</button>
        </div>
      </div>

      {/* Playlist Details */}
      <div className="playlistDetails">
        {currentPlaylistId ? (
          <>
            {/* Playlist Header */}
            <div className="playlistSummary">
              {editingName ? (
                <div className="editNameContainer">
                  <input
                    type="text"
                    value={newPlaylistName}
                    className="editNameInput"
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onBlur={saveNewName} // Save on blur
                    autoFocus
                  />
                  <button className="saveNameButton" onClick={saveNewName}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="playlistName">
                  <h1>{playlists[currentPlaylistId].name}</h1>
                  <FiEdit
                    size="20px"
                    className="editNameButton"
                    onClick={() =>
                      startEditingName(
                        currentPlaylistId,
                        playlists[currentPlaylistId].name
                      )
                    }
                  />
                </div>
              )}
            </div>

            {/* Media List */}
            <div className="mediaList">
              {playlists[currentPlaylistId]?.items ? (
                Object.keys(playlists[currentPlaylistId].items).map((itemId) => {
                  const item = playlists[currentPlaylistId].items[itemId];
                  return (
                    <div key={itemId} className="mediaItem">
                      <div>
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={`Thumbnail for ${itemId}`}
                            className="mediaThumbnail"
                          />
                        ) : (
                          <video
                            src={item.url}
                            controls
                            className="mediaThumbnail"
                          />
                        )}
                        <div className="mediaDetails">
                          <p>Type: {item.type}</p>
                          <p>Duration: {item.duration} ms</p>
                          <p>Times Played: {item.timesPlayed || 0}</p>
                        </div>
                      </div>
                      <button
                        className="deleteButton"
                        onClick={() =>
                          removeItem(currentPlaylistId, itemId)
                            .then(() => {
                              console.log(`Item ${itemId} removed successfully.`);
                            })
                            .catch((error) => {
                              console.error(
                                `Failed to remove item ${itemId}:`,
                                error
                              );
                            })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>No media items found.</p>
              )}
            </div>

            {/* Add New Item */}
            <div className="addNewItemForm">
              <h3>Add New Item</h3>
              <form onSubmit={handleAddNewItem}>
                <div>
                  <label>Type:</label>
                  <select name="type" required>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label>URL:</label>
                  <input type="text" name="url" required />
                </div>
                <div>
                  <label>Duration (ms):</label>
                  <input type="number" name="duration" required />
                </div>
                <button type="submit" className="addButton">
                  Add Item
                </button>
              </form>
            </div>
          </>
        ) : (
          <h2>Select a playlist to view its details</h2>
        )}
      </div>
    </div>
  );
}

export default Playlist;
