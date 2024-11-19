import React, { useState } from "react";
import { FiEdit } from "react-icons/fi"; // Import pencil icon
import "../Playlist.scss";

function Playlist({ playlists, updatePlaylistName, addNewItem, removeItem }) {
  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

  // Start editing the playlist name
  const startEditingName = (playlistId, currentName) => {
    setEditingName(true);
    setNewPlaylistName(currentName);
    setCurrentPlaylistId(playlistId);
  };

  // Save the new playlist name
  const saveNewName = () => {
    if (currentPlaylistId && newPlaylistName.trim() !== "") {
      updatePlaylistName(currentPlaylistId, newPlaylistName.trim());
    }
    setEditingName(false);
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
              className={
                currentPlaylistId === playlistId ? "activePlaylist" : ""
              }
              onClick={() => setCurrentPlaylistId(playlistId)}
            >
              {playlists[playlistId].name}
            </li>
          ))}
        </ul>
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
                  <button
                    className="saveNameButton"
                    onClick={saveNewName}
                  >
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
              {Object.keys(playlists[currentPlaylistId].items || {}).map(
                (itemId) => {
                  const item = playlists[currentPlaylistId].items[itemId];
                  return (
                    <div key={itemId} className="mediaItem">
                      <div>
                        <img
                          src={item.url}
                          alt={`Thumbnail for ${itemId}`}
                          className="mediaThumbnail"
                        />
                        <div className="mediaDetails">
                          <p>Type: {item.type}</p>
                          <p>Duration: {item.duration} ms</p>
                        </div>
                      </div>
                      <button
                        className="deleteButton"
                        onClick={() =>
                          removeItem(currentPlaylistId, itemId)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                }
              )}
            </div>

            {/* Add New Item */}
            <div className="addNewItemForm">
              <h3>Add New Item</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const type = e.target.type.value;
                  const url = e.target.url.value;
                  const duration = e.target.duration.value;
                  if (type && url && duration) {
                    addNewItem(currentPlaylistId, { type, url, duration });
                    e.target.reset();
                  }
                }}
              >
                <div>
                  <label>Type:</label>
                  <select name="type">
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
