import React, { useState } from "react";
import { connect } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { DragDropContext } from "react-beautiful-dnd";
import "../../Playlist.scss";
import PlaylistReorder from "./PlaylistReorder";
import FilesPlaylistSidebar from "./FilesPlaylistSidebar";
import {
  removeItem,
  updatePlaylistName,
  createNewPlaylist,
  updatePlaylistOrder,
} from "../../utils/firebaseActions";

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

  const saveNewName = () => {
    if (currentPlaylistId && newPlaylistName.trim() !== "") {
      updatePlaylistName(currentPlaylistId, newPlaylistName.trim(), userID);
    }
    setEditingName(false);
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

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    let updatedItems = Array.from(playlistItems);
  
    if (source.droppableId === "sidebar" && destination.droppableId === "playlist") {
      const file = JSON.parse(draggableId);
      if(file.fileType.includes("image")){
        file.fileType="image"
      } else if(file.fileType.includes("video")){
        file.fileType="video"
      } else {
        return console.log("error")
      }
      const newItem = {type: file.fileType, imageId: file.imageId, url: file.url, id: `file-${Date.now()}`, duration: file.duration || 5000, }
        updatedItems.splice(destination.index, 0, newItem);
        console.log(newItem)
        setPlaylistItems(updatedItems);
        updatePlaylistOrder(currentPlaylistId, updatedItems, userID)
        .then(() => console.log("Firebase updated with new order"))
        .catch((error) => console.error("Failed to update Firebase:", error));
    }
  
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [movedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, movedItem);
  
      setPlaylistItems(updatedItems);
  
      updatePlaylistOrder(currentPlaylistId, updatedItems, userID)
        .then(() => console.log("Reordered playlist saved to Firebase"))
        .catch((error) => console.error("Failed to update Firebase:", error));
    }
  };
  

  const handleRemoveItem = (itemId) => {
    removeItem(currentPlaylistId, itemId).then(() =>
      setPlaylistItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    );
  };

  return (
    <div className="playlistContainer">
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
          <button onClick={() => createNewPlaylist(newPlaylistFormName)}>Create</button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="playlistDetails">
          {currentPlaylistId ? (
            <>
              <div className="playlistSummary">
                {editingName ? (
                  <div className="editNameContainer">
                    <input
                      type="text"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      onBlur={saveNewName}
                    />
                  </div>
                ) : (
                  <h1>
                    {playlists[currentPlaylistId]?.name}
                    <FiEdit
                      onClick={() =>
                        startEditingName(currentPlaylistId, playlists[currentPlaylistId]?.name)
                      }
                    />
                  </h1>
                )}
              </div>
              <div className="playlistFiles">

                <PlaylistReorder
                  playlistItems={playlistItems}
                  onReorder={setPlaylistItems}
                  onRemove={handleRemoveItem}
                />
                <FilesPlaylistSidebar />
              </div>
            </>
          ) : (
            <div>
              <h2>Select a playlist to view its details</h2>
              <div className="playlistFiles">

                <div className="mediaList"/>
                <FilesPlaylistSidebar />
              </div>
            </div>
            
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

const mapStateToProps = (state) => ({
  playlists: state.playlistState,
  userInfo: state.userInfoState,
});

export default connect(mapStateToProps)(Playlist);
