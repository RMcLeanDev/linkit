import React from "react";
import { connect } from "react-redux";
import { FaRegImage, FaRegFileVideo } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";

function FilesPlaylistSidebar({ userInfo, isLoading }) {
  if (isLoading) {
    return (
      <div>
        <p>Loading Files...</p>
      </div>
    );
  }

  return (
    <Droppable droppableId="sidebar" isDropDisabled={false}>
      {(provided) => (
        <div
          className="playlistFilesSidebar"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <input placeholder="Search..." className="searchBar"/>
          <hr/>
          {Object.keys(userInfo.files).map((fileKey, index) => {
            const file = userInfo.files[fileKey];
            return (
              <Draggable
                key={file.id}
                draggableId={JSON.stringify(file)}
                index={index}
              >
                {(provided) => (
                  <div
                    className="playlistFilesInfomation"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="smallImg">
                        {file.fileType.includes("video") ? <video src={file.url}/> : <img src={file.url} alt={file.originalName}/>}
                    </div>
                    <div>
                        <p>{file.originalName}</p>
                        <p className="fileIcon">{file.fileType.includes("image") ? <FaRegImage color="#404040"/> : <FaRegFileVideo color="#404040"/>}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfoState,
  isLoading: state.filesState === null || state.userInfoState === null,
});

export default connect(mapStateToProps)(FilesPlaylistSidebar);
