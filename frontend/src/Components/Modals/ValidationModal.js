import React, { useState } from "react";
import {
  QuestionAndInputSelect,
  OperatorSelect,
  OpenBracketSelect,
  CloseBracketSelect,
  LastMenuSelect,
  isSequenceValid
} from "./Modal.js";
import "./Modal.css";

function ValidationModal(props) {
  const [validationObject, setValidationObject] = useState(
    props.question.validation.elements
  );
  const currentQuestion = props.question;
  const currentQuestionsArray = props.questions;
  const updateValidationObject = () => {
    console.log(currentQuestion);
    props.handleChange(props.question.id, "validation", {
      valid: isSequenceValid(validationObject),
      elements: validationObject,
    });
    props.toggleModal();
  };

  const handleValidationObjectChange = (id, newValue) => {
    setValidationObject((prevObject) => {
      const menuItem = prevObject.find((item) => item.id === id);
      if (menuItem !== undefined) {
        let updatedObject = prevObject.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        );
        if (menuItem.type === "Question" && menuItem.isInput === false) {
          console.log(currentQuestionsArray);
          const selectedQuestion = currentQuestionsArray.find(
            (question) => question.id === newValue.value
          );
          console.log(selectedQuestion);
          if (selectedQuestion !== undefined) {
            const conditionType = selectedQuestion.type
            updatedObject = updatedObject.map((item) =>
              item.id === id || item.id === id + 1 || item.id === id + 2
                ? { ...item, conditionType: conditionType }
                : item
            );
          }
        }
        console.log(updatedObject);
        return updatedObject;
      }
      return prevObject;
    });
  };
  const handleLastMenuChange = (id, newValue) => {
    setValidationObject((prevObject) => {
      const lastMenuItem = prevObject.find((item) => item.id === id);

      if (lastMenuItem !== undefined) {
        const updatedObject = prevObject.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        );

        if (lastMenuItem.value === "default" && newValue !== "default") {
          const openBracket = {
            id: validationObject.length + 1,
            type: "OpenBracket",
            value: "default",
          };
          const newQuestion1 = {
            id: validationObject.length + 2,
            type: "Question",
            isInput: false,
            conditionType: "text",
            value: { dropDown: true, value: "default" },
          };
          const newOperator = {
            id: validationObject.length + 3,
            type: "Operator",
            conditionType: "text",
            value: "default",
          };
          const newQuestion2 = {
            id: validationObject.length + 4,
            type: "Question",
            isInput: true,
            conditionType: "text",
            value: { dropDown: true, value: "default" },
          };
          const closenBracket = {
            id: validationObject.length + 5,
            type: "CloseBracket",
            value: "default",
          };
          const newEndMenu = {
            id: validationObject.length + 6,
            type: "LastMenu",
            value: "default",
          };
          return [
            ...updatedObject,
            openBracket,
            newQuestion1,
            newOperator,
            newQuestion2,
            closenBracket,
            newEndMenu,
          ];
        }

        if (lastMenuItem.value !== "default" && newValue === "default") {
          return updatedObject.filter((item) => item.id <= id);
        }

        return updatedObject;
      }

      return prevObject;
    });
  };
  return (
    <div className="modal">
      <div onClick={props.toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Validation</h2>
        <div className="calculation-area">
          <span className="value-title">If </span>
          <div className="options-row validation-row">
            {validationObject.map((item) => {
              if (item.type === "Question") {
                return (
                  <QuestionAndInputSelect
                    key={item.id}
                    id={item.id}
                    type={item.conditionType}
                    questions={props.questions}
                    value={item.value}
                    isInput={item.isInput}
                    isCalculation={false}
                    handleModalObjectChange={handleValidationObjectChange}
                  />
                );
              } else if (item.type === "Operator") {
                return (
                  <OperatorSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    type={item.conditionType}
                    isCalculation={false}
                    handleModalObjectChange={handleValidationObjectChange}
                  />
                );
              } else if (item.type === "OpenBracket") {
                return (
                  <OpenBracketSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    handleModalObjectChange={handleValidationObjectChange}
                  />
                );
              } else if (item.type === "CloseBracket") {
                return (
                  <CloseBracketSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    handleModalObjectChange={handleValidationObjectChange}
                  />
                );
              } else if (item.type === "LastMenu") {
                return (
                  <LastMenuSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    isCalculation={false}
                    handleLastMenuChange={handleLastMenuChange}
                  />
                );
              } else return null;
            })}
          </div>
        </div>
        <button className="close-modal" onClick={updateValidationObject}>
          SAVE
        </button>
      </div>
    </div>
  );
}

export default ValidationModal;
