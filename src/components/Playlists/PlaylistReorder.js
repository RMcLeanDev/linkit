import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaRegImage, FaRegFileVideo } from "react-icons/fa";

function PlaylistReorder({ playlistItems, onRemove }) {
  return (
    <Droppable droppableId="playlist">
      {(provided) => (
        <div
          className="mediaList"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {playlistItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="mediaItem"
                >
                  <div className="playlistItemInformation">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Thumbnail for ${item.id}`}
                        className="mediaThumbnail"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="mediaThumbnail"
                      />
                    )}
                  </div>
                  <div className="mediaDetails">
                      <p>{item.originalName}</p>
                      <p style={{marginTop: "5px"}} className="fileIcon">{item.type.includes("image") ? <FaRegImage color="#404040"/> : <FaRegFileVideo color="#404040"/>}</p>
                    </div>
                  <button
                    className="deleteButton"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default PlaylistReorder;
