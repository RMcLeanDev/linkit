import React, { useState } from "react";
import { connect } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { DragDropContext } from "react-beautiful-dnd";
import PlaylistReorder from "./PlaylistReorder";
import FilesPlaylistSidebar from "./FilesPlaylistSidebar";
import {
  removeItem,
  updatePlaylistName,
  updatePlaylistOrder,
} from "../../utils/firebaseActions";
import PlaylistsSidebar from "./PlaylistsSidebar";

function Playlist({ playlists, userInfo }) {
  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  
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

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    let updatedItems = Array.from(playlists[currentPlaylistId]?.items || []);
  
    if (source.droppableId === "sidebar" && destination.droppableId === "playlist") {
      const file = JSON.parse(draggableId);
      const newItem = {
        id: `file-${Date.now()}`,
        type: file.fileType.includes("image") ? "image" : "video",
        imageId: file.imageId || null,
        url: file.url,
        duration: (file.duration || 5) * 1000, 
        originalName: file.originalName,
      };
  
      updatedItems.splice(destination.index, 0, newItem);
      updatedItems = updatedItems.filter((item) => item !== undefined && item !== null);
    
      updatePlaylistOrder(currentPlaylistId, updatedItems, userID)
        .then(() => {
          console.log("Firebase updated with new order");
        })
        .catch((error) => console.error("Failed to update Firebase:", error));
    }
  
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [movedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, movedItem);
  
      updatedItems = updatedItems.filter((item) => item !== undefined && item !== null);
  
      console.log("Reordered Items:", updatedItems);
  
      updatePlaylistOrder(currentPlaylistId, updatedItems, userID)
        .then(() => {
          console.log("Reordered playlist saved to Firebase");
        })
        .catch((error) => console.error("Failed to update Firebase:", error));
    }
  };
  

  const handleRemoveItem = (itemId) => {
    removeItem(currentPlaylistId, itemId)
  };

  return (
    <div className="playlistContainer">
      <PlaylistsSidebar playlists={playlists} currentPlaylistId={currentPlaylistId} setCurrentPlaylistId={setCurrentPlaylistId}/>
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
                  <h2>
                    {playlists[currentPlaylistId]?.name}
                    <FiEdit
                      onClick={() =>
                        startEditingName(currentPlaylistId, playlists[currentPlaylistId]?.name)
                      }
                    />
                  </h2>
                )}
              </div>
              <div className="playlistFiles">

                <PlaylistReorder
                  playlistItems={playlists[currentPlaylistId]?.items || []}
                  onRemove={handleRemoveItem}
                />
                <FilesPlaylistSidebar />
              </div>
            </>
          ) : (
            <div>
              <div className="playlistSummary">
                <h2>Select a playlist to view details</h2>
              </div>  
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