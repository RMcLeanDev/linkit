import React, { useState } from "react";
import { connect } from "react-redux";
import { FiEdit } from "react-icons/fi";
import "../../Playlist.scss";
import PlaylistReorder from "./PlaylistReorder";
import {
  addNewItem,
  removeItem,
  updatePlaylistName,
  createNewPlaylist,
  updatePlaylistOrder,
} from "../../utils/firebaseActions";
import FilesPlaylistSidebar from "./FilesPlaylistSidebar";

function Playlist({ playlists, userInfo }) {
  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [newPlaylistFormName, setNewPlaylistFormName] = useState("");
  const [playlistItems, setPlaylistItems] = useState([]);

  const userID = userInfo?.userid;

  const startEditingName = (playlistId, currentName) => {
    setEditingName(true);
    setNewPlaylistName(currentName);
    setCurrentPlaylistId(playlistId);
  };

  const handleDropFile = (updatedItems) => {
    setPlaylistItems(updatedItems);
  };

  const saveNewName = () => {
    if (currentPlaylistId && newPlaylistName.trim() !== "") {
      updatePlaylistName(currentPlaylistId, newPlaylistName.trim(), userID)
        .then(() => console.log("Playlist name updated successfully."))
        .catch((error) => console.error("Error updating playlist name:", error));
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
        .then(() => setNewPlaylistFormName(""))
        .catch((error) => console.error("Failed to create new playlist:", error));
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    const { type, url, duration } = e.target;

    if (type.value && url.value && duration.value && currentPlaylistId) {
      addNewItem(
        currentPlaylistId,
        { type: type.value, url: url.value, duration: parseInt(duration.value, 10) },
        userID
      ).then(() => e.target.reset());
    }
  };

  const handleSelectPlaylist = (playlistId) => {
    setCurrentPlaylistId(playlistId);
    const playlist = playlists[playlistId];
    const items = playlist?.items || {};
    setPlaylistItems(
      Object.keys(items).map((itemId) => ({
        id: itemId,
        ...items[itemId],
      }))
    );
  };

  const handleReorder = (reorderedItems) => {
    setPlaylistItems(reorderedItems);
    updatePlaylistOrder(currentPlaylistId, reorderedItems, userID).catch((error) =>
      console.error("Error updating playlist order:", error)
    );
  };

  const handleRemoveItem = (itemId) => {
    removeItem(currentPlaylistId, itemId).then(() =>
      setPlaylistItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    );
  };

  return (
    <div className="playlistContainer">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Playlists</h3>
        <ul>
          {Object.keys(playlists || {}).map((playlistId) => (
            <li
              key={playlistId}
              className={currentPlaylistId === playlistId ? "activePlaylist" : ""}
              onClick={() => handleSelectPlaylist(playlistId)}
            >
              {playlists[playlistId].name}
            </li>
          ))}
        </ul>

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
            <div className="playlistSummary">
              {editingName ? (
                <div className="editNameContainer">
                  <input
                    type="text"
                    value={newPlaylistName}
                    className="editNameInput"
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onBlur={saveNewName}
                    autoFocus
                  />
                  <button className="saveNameButton" onClick={saveNewName}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="playlistName">
                  <h1>{playlists[currentPlaylistId]?.name}</h1>
                  <FiEdit
                    size="20px"
                    className="editNameButton"
                    onClick={() =>
                      startEditingName(currentPlaylistId, playlists[currentPlaylistId]?.name)
                    }
                  />
                </div>
              )}
            </div>

            <PlaylistReorder
              playlistItems={playlistItems}
              onReorder={handleReorder}
              onRemove={handleRemoveItem}
              onDropFile={handleDropFile}
            />
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
      <FilesPlaylistSidebar/>
    </div>
  );
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  playlists: state.playlistState,
  userInfo: state.userInfoState,
});

export default connect(mapStateToProps)(Playlist);
