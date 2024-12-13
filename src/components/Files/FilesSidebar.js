import React from 'react';
import { FaSearch } from "react-icons/fa";

function FilesSidebar(props){

    return(
        <div>
            <div className="filessidebar">
                <div className="searchBar">
                    <input 
                    type="text" 
                    placeholder="Search" 
                    className="searchInput"
                    value={props.search}
                    onChange={(e) => props.setSearch(e.target.value)}
                    />
                    <button className="clearButton" onClick={() => props.setSearch("")}>✖</button>
                    <button className="searchButton">
                        <FaSearch size="18px" color="#505050"/>
                    </button>
                </div>
            </div>
            <hr style={{width: "90%", opacity: "0.5"}}/>
            <div>
                search
            </div>
        </div>
    )
}

export default FilesSidebar;