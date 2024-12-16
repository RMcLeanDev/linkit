import React from 'react';
import { FaRegImage, FaRegFileVideo } from "react-icons/fa";
import moment from 'moment'

function FileLayout({file}){
    console.log(file)
    return(
        <div className="fileLayout">
            <div className="fileImage">
                {file.fileType.includes("video") ? <video src={file.url}/> : <img src={file.url}/>}
            </div>
            <p className="fileName">{file.originalName}</p>
            <p className="fileIcon">{file.fileType.includes("image") ? <FaRegImage color="#404040"/> : <FaRegFileVideo color="#404040"/>}</p>
            <p className="fileAdded">Last Modified: {moment(file.modifiedAt).startOf('hour').fromNow()}</p>
        </div>
    )
}

export default FileLayout;