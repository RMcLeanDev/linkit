import React, {useState} from 'react'
import { createNewPlaylist } from '../../utils/firebaseActions';

function PlaylistsSidebar({playlists, currentPlaylistId, setCurrentPlaylistId, setPlaylistItems}){
    
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