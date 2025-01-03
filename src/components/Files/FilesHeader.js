import React, {useState} from 'react';
import { FaFilter } from "react-icons/fa";

function FilesHeader(props){

    const [filterDropdown, setFilterDropdown] = useState(true);

    return(
        <div className="filesHeader">
            header
            <div className="filterSection">
                <FaFilter className="filterIcon"/>
                {filterDropdown ? 
                <div className="filterOptions">
                    options
                </div>
                : null}
            </div>
        </div>
    )
}

export default FilesHeader