import React, {useState} from 'react';
import { FaFilter } from "react-icons/fa";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";


function FilesHeader(props){

    const [filterDropdown, setFilterDropdown] = useState(false);

    return(
        <div className="filesHeader">
            header
            <div className="filterSection">
                <FaFilter className="filterIcon" onClick={() => setFilterDropdown(!filterDropdown)}/>
                {filterDropdown ? 
                <div className="filterOptions">
                    <div className={props.filter === "cdasc" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("cdasc")}>
                        <TbSortAscendingNumbers/>
                        <p>Creation Date Asc.</p>
                    </div>
                    <div className={props.filter === "cddes" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("cddes")}>
                        <TbSortDescendingNumbers/>
                        <p>Creation Date Des.</p>
                    </div> 
                    <div className={props.filter === "laasc" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("laasc")}>
                        <TbSortAscendingNumbers/>
                        <p>Last Modified Asc.</p>
                    </div>
                    <div className={props.filter === "lades" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("lades")}>
                        <TbSortDescendingNumbers/>
                        <p>Last Modified Des.</p>
                    </div> 
                    <div className={props.filter === "alasc" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("alasc")}>
                        <TbSortAscendingLetters/>
                        <p>Alphabetical Asc.</p>
                    </div>
                    <div className={props.filter === "aldes" ? "filterOption active": "filterOption"} onClick={() => props.setFilter("aldes")}>
                        <TbSortDescendingLetters/>
                        <p>Alphabetical Des.</p>
                    </div>     
                </div>
                : null}
            </div>
        </div>
    )
}

export default FilesHeader