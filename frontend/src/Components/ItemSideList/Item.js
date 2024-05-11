import React from "react";
import "./Item.css";
import { Draggable } from "react-beautiful-dnd";

function Item(props) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <div
            className="item-card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging
                ? provided.draggableProps.style?.transform
                : "translate(0px, 0px)",
            }}
          >
            <img
              className="item-image"
              src={props.image}
              alt={props.name}
            />
            <span className="item-text">{props.name}</span>
          </div>
          {snapshot.isDragging && (
            <div className="item-card" style={{ transform: "none !important" }}>
              <img
                className="item-image"
                src={props.image}
                alt={props.name}
              />
              <p className="item-text">{props.name}</p>
            </div>
          )}
        </React.Fragment>
      )}
    </Draggable>
  );
}

export default Item;
