import React, {useState} from 'react';
import { FaFilter } from "react-icons/fa";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";
import { MdPhotoSizeSelectLarge } from "react-icons/md";

function FilesHeader(props){

    const [filterDropdown, setFilterDropdown] = useState(false);
    const [imageDropdown, setImageDropdown] = useState(false)

    function parseFileSize(fileSizeStr) {
        if (typeof fileSizeStr !== "string") {
            console.error("Invalid fileSize value:", fileSizeStr);
            return 0; 
        }

        const units = { "B": 1, "KB": 1024, "MB": 1024 ** 2, "GB": 1024 ** 3 }; 
        const match = fileSizeStr.match(/([\d.]+)\s*(B|KB|MB|GB)/i); 

        if (!match) {
            console.error("Failed to parse fileSize:", fileSizeStr);
            return 0; 
        }

        const value = parseFloat(match[1]); 
        const unit = match[2].toUpperCase(); 

        return value * (units[unit] || 1); 
    }

    const totalFileSize = Array.isArray(props.files)
        ? props.files.reduce((sum, file) => sum + parseFileSize(file.fileSize), 0)
        : 0;

    const totalSizeGB = (totalFileSize / (1024 ** 3)).toFixed(2);

    const totalFiles = Array.isArray(props.files) ? props.files.length : 0;

    const totalImages = Array.isArray(props.files)
        ? props.files.filter(file => file.fileType?.startsWith("image")).length
        : 0;

    const totalVideos = Array.isArray(props.files)
        ? props.files.filter(file => file.fileType?.startsWith("video")).length
        : 0;

    return(
        <div className="filesHeader">
            <div style={{justifySelf:"flex-start", marginLeft:"20px", color: "#303030"}}>
                Images: {totalImages} | Videos: {totalVideos} | Total Files: {totalFiles} 
            </div>
            <div style={{color: "#303030"}}>
                {props.files ? <div>
                    Storage Used: {totalSizeGB} GB
                </div> : "loading..."}
            </div>
            <div className="filterContainer">
                <div className="filterSection">
                    <MdPhotoSizeSelectLarge className="filterIcon imgfilter" onClick={() => setImageDropdown(!imageDropdown)}/>
                    {imageDropdown ? 
                    <div className="filterOptions">
                        <div className="triangle"/>
                        <div className={props.imageSize === "sm" ? "filterOption active": "filterOption"} onClick={() => props.setImageSize("sm")}>
                            <p>Small Cards</p>
                        </div> 
                        <div className={props.imageSize === "md" ? "filterOption active": "filterOption"} onClick={() => props.setImageSize("md")}>
                            <p>Medium Cards</p>
                        </div> 
                        <div className={props.imageSize === "lg" ? "filterOption active": "filterOption"} onClick={() => props.setImageSize("lg")}>
                            <p>Large Cards</p>
                        </div> 
                    </div>
                    : null}
                </div>
                <div className="filterSection">
                    <FaFilter className="filterIcon" onClick={() => setFilterDropdown(!filterDropdown)}/>
                    {filterDropdown ? 
                    <div className="filterOptions">
                        <div className="triangleSort"/>
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
        </div>
    )
}

export default FilesHeader