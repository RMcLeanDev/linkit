import React, {useState} from 'react'
import { createNewPlaylist } from '../../utils/firebaseActions';

function PlaylistsSidebar({playlists, currentPlaylistId, setCurrentPlaylistId, setPlaylistItems}){

    const [newPlaylistFormName, setNewPlaylistFormName] = useState("");
    
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

    return(
        <div className="sidebar">
        <h3>Playlists</h3>
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
      </div>
    )
}

export default PlaylistsSidebar