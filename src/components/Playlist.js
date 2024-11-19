import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../actions";
import "../Playlist.scss";

const Playlist = () => {
  const playlists = useSelector((state) => state.playlists || {});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching playlists from Firebase...");
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      // Logic for adding a new playlist
      console.log("Adding new playlist:", newPlaylistName);
      setNewPlaylistName("");
    }
  };

  const renderPlaylists = () => {
    if (Object.keys(playlists).length === 0) {
      return <p>No playlists found. Add one!</p>;
    }

    return Object.keys(playlists).map((playlistId) => {
      const playlist = playlists[playlistId];
      return (
        <li
          key={playlistId}
          className={selectedPlaylist === playlistId ? "activePlaylist" : ""}
          onClick={() => setSelectedPlaylist(playlistId)}
        >
          {playlist.name || "Unnamed Playlist"}
        </li>
      );
    });
  };

  const renderPlaylistItems = () => {
    if (!selectedPlaylist || !playlists[selectedPlaylist]?.items) {
      return <p>No items in this playlist.</p>;
    }

    return Object.keys(playlists[selectedPlaylist].items).map((itemId) => {
      const item = playlists[selectedPlaylist].items[itemId];
      return (
        <div key={itemId} className="mediaItem">
          <div className="mediaDetails">
            <p>Type: {item.type}</p>
            <p>URL: {item.url}</p>
          </div>
          {item.type === "image" && <img src={item.url} alt="Thumbnail" className="mediaThumbnail" />}
          <button className="deleteButton" onClick={() => console.log(`Delete ${itemId}`)}>
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div className="playlistContainer">
      <div className="sidebar">
        <h3>Playlists</h3>
        <ul>{renderPlaylists()}</ul>
        <div>
          <input
            type="text"
            placeholder="New Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button onClick={handleAddPlaylist}>Add Playlist</button>
        </div>
      </div>
      <div className="playlistDetails">
        {selectedPlaylist ? (
          <>
            <h2>{playlists[selectedPlaylist]?.name || "Unnamed Playlist"}</h2>
            <div className="mediaList">{renderPlaylistItems()}</div>
          </>
        ) : (
          <p>Select a playlist to view details</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
