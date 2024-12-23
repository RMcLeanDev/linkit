import React from 'react'
import { createNewPlaylist } from '../../utils/firebaseActions';

function PlaylistsSidebar({playlists, currentPlaylistId, setCurrentPlaylistId}){
    
    const handleSelectPlaylist = (playlistId) => {
        setCurrentPlaylistId(playlistId);
      };

    return(
        <div className="sidebar">
        <h3>Playlists</h3>
        <div className="addPlaylist">
            <button onClick={() => createNewPlaylist("Unnamed Playlist")}>Create New Playlist</button>
            <hr/>
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