import React from "react";
import Item from "./Item.js";
import "./ItemList.css";
import { Droppable } from "react-beautiful-dnd";

function ItemList(props) {
  const itemTags = props.items.map((item, index) => {
    return (
      <Item
        id={item.type}
        key={item.type}
        index={index}
        name={item.name}
        image={item.image}
      />
    );
  });
  return (
    <div className="height100">
      <Droppable droppableId={"item-list"} isDropDisabled={true}>
        {(provided) => (
          <div className="item-list-container">
            <span className="items-title">Items</span>
            <div
              className="item-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {itemTags}
              {provided.placeholder}
            </div>
            <div className="item-list item-list-footer">
              <a
                href="https://www.cit.tum.de/cit/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutz
              </a>
              <a
                href="https://www.cit.tum.de/cit/impressum/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Impressum
              </a>
              <a
                href="/userguide.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                User Guide
              </a>
              <a href="mailto:vishav.ghotra@tum.de">Contact</a>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ItemList;
