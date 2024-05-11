import React, { useState } from "react";
import CalculationModal from "../../Modals/CalculationModal";
import ValidationModal from "../../Modals/ValidationModal";
import "./PropertiesPanel.css";
import { PropertyItems } from "./helper";

function PropertiesPanel(props) {
  const [calculationModal, setCalculationModal] = useState(false);
  const [validationModal, setValidationModal] = useState(false);

  const toggleCalculationModal = () => {
    setCalculationModal(!calculationModal);
  };

  const toggleValidationModal = () => {
    setValidationModal(!validationModal);
  };

  const handlePropertyChange = (event, property) => {
    props.updateProperty(props.questionItem.id, property, event.target.value);
    console.log(props.questionItem);
  };

  const handlePropertyCheckbox = (event, property) => {
    props.updateProperty(props.questionItem.id, property, event.target.checked);
  };
  return (
    <div className="properties-panel">
      <div className="properties-header">
        <span className="properties-title">Properties</span>
        <button className="properties-close" onClick={props.closePropertyPanel}>X</button>
      </div>
      <PropertyItems
        questionItem={props.questionItem}
        updateProperty={props.updateProperty}
        handlePropertyChange={handlePropertyChange}
        handlePropertyCheckbox={handlePropertyCheckbox}
        toggleCalculationModal={toggleCalculationModal}
        toggleValidationModal={toggleValidationModal}
      />
      {calculationModal && (
        <CalculationModal
          question={props.questionItem}
          questions={props.questions}
          toggleModal={toggleCalculationModal}
          handleChange={props.updateProperty}
        />
      )}
      {validationModal && (
        <ValidationModal
          question={props.questionItem}
          questions={props.questions}
          toggleModal={toggleValidationModal}
          handleChange={props.updateProperty}
        />
      )}
    </div>
  );
}

export default PropertiesPanel;
