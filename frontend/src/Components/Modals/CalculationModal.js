import React, { useState } from "react";
import {
  QuestionAndInputSelect,
  OperatorSelect,
  OpenBracketSelect,
  CloseBracketSelect,
  LastMenuSelect,
  isSequenceValid,
} from "./Modal.js";
import "./Modal.css";

function CalculationModal(props) {
  const [calculationObject, setCalculationObject] = useState(
    props.question.calculationFormula.elements
  );
  
  const updateCalculationObject = () => {
    props.handleChange(props.question.id, "calculationFormula", {
      valid: isSequenceValid(calculationObject),
      elements: calculationObject,
    });
    props.toggleModal();
  };
  const handleCalculationObjectChange = (id, newValue) => {
    setCalculationObject((prevObject) => {
      const menuItem = prevObject.find((item) => item.id === id);

      if (menuItem !== undefined) {
        const updatedObject = prevObject.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        );
        console.log(updatedObject);
        return updatedObject;
      }
      return prevObject;
    });
  };

  const handleLastMenuChange = (id, newValue) => {
    setCalculationObject((prevObject) => {
      const lastMenuItem = prevObject.find((item) => item.id === id);

      if (lastMenuItem !== undefined) {
        const updatedObject = prevObject.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        );

        if (lastMenuItem.value === "default" && newValue !== "default") {
          const openBracket = {
            id: calculationObject.length + 1,
            type: "OpenBracket",
            value: "default",
          };

          const newQuestion = {
            id: calculationObject.length + 2,
            type: "Question",
            value: { dropDown: true, value: "default" },
          };

          const closeBracket = {
            id: calculationObject.length + 3,
            type: "CloseBracket",
            value: "default",
          };

          const newEndMenu = {
            id: calculationObject.length + 4,
            type: "LastMenu",
            value: "default",
          };
          return [
            ...updatedObject,
            openBracket,
            newQuestion,
            closeBracket,
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
        <h2>Calculation</h2>
        <div className="calculation-area">
          <span className="value-title">Value:</span>
          <div className="options-row">
            {calculationObject.map((item) => {
              if (item.type === "Question") {
                return (
                  <QuestionAndInputSelect
                    key={item.id}
                    id={item.id}
                    type="number"
                    questions={props.questions}
                    value={item.value}
                    isInput={true}
                    isCalculation={true}
                    handleModalObjectChange={handleCalculationObjectChange}
                  />
                );
              } else if (item.type === "Operator") {
                return (
                  <OperatorSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    type="number"
                    isCalculation={true}
                    handleModalObjectChange={handleCalculationObjectChange}
                  />
                );
              } else if (item.type === "OpenBracket") {
                return (
                  <OpenBracketSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    handleModalObjectChange={handleCalculationObjectChange}
                  />
                );
              } else if (item.type === "CloseBracket") {
                return (
                  <CloseBracketSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    handleModalObjectChange={handleCalculationObjectChange}
                  />
                );
              } else if (item.type === "LastMenu") {
                return (
                  <LastMenuSelect
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    isCalculation={true}
                    handleLastMenuChange={handleLastMenuChange}
                  />
                );
              } else return null;
            })}
          </div>
        </div>
        <button className="close-modal" onClick={updateCalculationObject}>
          SAVE
        </button>
      </div>
    </div>
  );
}

export default CalculationModal;
