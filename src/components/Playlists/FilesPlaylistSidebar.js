import React from 'react';
import { connect } from 'react-redux';

function FilesPlaylistSidebar({userInfo, isLoading}){

    const handleDragStart = (e, file) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(file));
        e.effectAllowed = "copy";
      };

    if (isLoading) {
        return (
          <div>
            <p>Loading Files...</p>
          </div>
        );
      }
    
      return (
        <div className="playlistFilesSidebar">
          <input placeholder='Search...'/>
          {Object.keys(userInfo.files).map((files) => {
            let file = userInfo.files[files]
            return <div className="playlistFilesInfomation" draggable key={file.id} onDragStart={(e) => handleDragStart(e, file)}>
                <div className="smallImg">
                    <img src={file.url}/>
                </div>
                <p>{file.originalName}</p>
            </div>
          })}
        </div>
      );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfoState, 
    isLoading: state.filesState === null || state.userInfoState === null, 
  });

export default connect(mapStateToProps)(FilesPlaylistSidebar)