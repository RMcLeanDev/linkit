import React, {useState} from 'react'
import { createNewPlaylist } from '../../utils/firebaseActions';
import { FaSearch } from "react-icons/fa";

function PlaylistsSidebar({playlists, currentPlaylistId, setCurrentPlaylistId}){

  const [search, setSearch] = useState('')
    
    const handleSelectPlaylist = (playlistId) => {
        setCurrentPlaylistId(playlistId);
      };

    return(
        <div className="sidebar">
        <div className="addPlaylist">
            <button onClick={() => createNewPlaylist("Unnamed Playlist")}>Create New Playlist</button>
            <h3>Playlists</h3>
            <div className="searchBar">
                <input 
                type="text" 
                placeholder="Search..." 
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button className="clearButton" onClick={() => setSearch("")}>✖</button>
            </div>
            <hr/>
        </div>
        <ul>
        {Object.keys(playlists || {})
          .filter((playlistId) => 
            playlists[playlistId].name.toLowerCase().includes(search.toLowerCase())
          )
          .map((playlistId) => (
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