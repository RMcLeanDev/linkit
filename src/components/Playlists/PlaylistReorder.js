import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../../Playlist.scss";

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
                  <div>
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Thumbnail for ${item.id}`}
                        className="mediaThumbnail"
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls
                        className="mediaThumbnail"
                      />
                    )}
                    <div className="mediaDetails">
                      <p>Type: {item.type}</p>
                      <p>Duration: {item.duration} ms</p>
                      <p>Times Played: {item.timesPlayed || 0}</p>
                    </div>
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
