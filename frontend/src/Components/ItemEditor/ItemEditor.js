import React, { useState } from "react";
import QuestionItem from "../FormQuestions/QuestionItem";
import PropertyPanel from "./PropertiesPanel/PropertiesPanel";
import "./ItemEditor.css";
import { Droppable } from "react-beautiful-dnd";
import { generateQuestions } from "../../Utils/AI-Integration/createQuestionsAI";

function ItemEditor(props) {
  const [propertyPanelVisible, setPropertyPanelVisible] = useState(null);
  const [userInput, setUserInput] = useState("");
  const updatePropertyPanel = (questionId) => {
    setPropertyPanelVisible((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  const getPropertiesById = () => {
    if (propertyPanelVisible === null) {
      return {};
    }
    const filteredQuestion = props.questions.find(
      (question) => question.id === propertyPanelVisible
    );

    return filteredQuestion;
  };

  return (
    <div className="item-editor-with-panel">
      <div
        className={`item-editor ${
          propertyPanelVisible !== null ? "panel-present" : "panel-absent"
        }`}
      >
        <div className="ai-box">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask AI!"
            rows={3}
            className="ai-text-field"
          ></textarea>
          <button
            className="ai-generate-button"
            onClick={() => {
              setPropertyPanelVisible(null);
              generateQuestions(userInput, props.setNewQuestions);
            }}
          >
            Generate
          </button>
        </div>
        <div id="loading-spinner" className="spinner-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
        <Droppable droppableId={props.columnId}>
          {(provided) => (
            <div className="flex-horizontal">
              <div
                className="item-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <input
                  type="text"
                  className="form-title"
                  value={props.title}
                  onChange={(event) => {
                    props.setTitle(event.target.value);
                  }}
                  placeholder="Enter the title of the form"
                />
                {props.questions.map((question, index) => (
                  <QuestionItem
                    questionItem={question}
                    key={question.id}
                    index={index}
                    updateProperty={props.updateProperty}
                    deleteQuestion={props.deleteQuestion}
                    showProperties={updatePropertyPanel}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
      {propertyPanelVisible !== null && (
        <PropertyPanel
          questionItem={getPropertiesById()}
          questions={props.questions}
          updateProperty={props.updateProperty}
          closePropertyPanel={() => setPropertyPanelVisible(null)}
        />
      )}
    </div>
  );
}

export default ItemEditor;
