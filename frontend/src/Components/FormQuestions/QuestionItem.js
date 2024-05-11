import React from "react";
import "./QuestionItem.css";
import { QuestionAnswer } from "./QuestionAnswer";
import { Draggable } from "react-beautiful-dnd";
import sortIcon from "../../img/sorticon.png";
import settingIcon from "../../img/settings.svg";
import deleteIcon from "../../img/delete.svg";

function QuestionItem(props) {
  const handleQuestionChange = (event) => {
    props.updateProperty(props.questionItem.id, "text", event.target.value);
  };

  const handleDelete = () => {
    props.showProperties(null);
    props.deleteQuestion(props.questionItem.id);
  };
  const handleSettings = () => {
    props.showProperties(props.questionItem.id);
  };

  return (
    <Draggable draggableId={props.questionItem.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={`question-container ${
            snapshot.isDragging ? "question-dragged" : ""
          }`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <img
            src={sortIcon}
            alt="Sort-Icon"
            className="icon-style"
            {...provided.dragHandleProps}
          ></img>
          <QuestionAnswer
            questionItem={props.questionItem}
            updateProperty={props.updateProperty}
            handleQuestionChange={handleQuestionChange}
          />
          <div className="vertical-positions">
            {props.questionItem.type !== "comment" && (
              <button onClick={handleSettings}>
                <img
                  src={settingIcon}
                  alt="Settings Icon"
                  className="icon-style"
                />
              </button>
            )}
            <button onClick={handleDelete}>
              <img
                src={deleteIcon}
                alt="Settings Icon"
                className="icon-style"
              />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default QuestionItem;
