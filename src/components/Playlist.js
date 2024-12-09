import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import "../Playlist.scss";
import PlaylistReorder from "./PlaylistReorder";
import {
  addNewItem,
  removeItem,
  updatePlaylistName,
  createNewPlaylist,
  updatePlaylistOrder,
} from "../utils/firebaseActions";
import { userID } from "../actions/index";

function Playlist({ playlists }) {
  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [newPlaylistFormName, setNewPlaylistFormName] = useState("");
  const [playlistItems, setPlaylistItems] = useState([]);
  const [newFile, setNewFile] = useState()

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

  const handleSelectPlaylist = (playlistId) => {
    setCurrentPlaylistId(playlistId);

    const playlist = playlists[playlistId];
    const items = playlist?.items || {};
    const formattedItems = Object.keys(items).map((itemId) => ({
      id: itemId,
      ...items[itemId],
    }));

    setPlaylistItems(formattedItems);
  };

  const handleReorder = (reorderedItems) => {
    setPlaylistItems(reorderedItems);

    updatePlaylistOrder(currentPlaylistId, reorderedItems, userID)
      .then(() => {
        console.log("Playlist reordered successfully.");
      })
      .catch((error) => {
        console.error("Error updating playlist order:", error);
      });
  };

  const handleRemoveItem = (itemId) => {
    removeItem(currentPlaylistId, itemId)
      .then(() => {
        console.log(`Item ${itemId} removed successfully.`);
        setPlaylistItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      })
      .catch((error) => {
        console.error(`Failed to remove item ${itemId}:`, error);
      });
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

            <PlaylistReorder
              playlistItems={playlistItems}
              onReorder={handleReorder}
              onRemove={handleRemoveItem}
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
    </div>
  );
}

export default Playlist;
