import deleteIcon from "../../../img/delete.svg";

export function PropertyQuestionText(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Question Text</label>
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.handleChange(event, "text")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyPlaceholderText(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Placeholder</label>
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.handleChange(event, "placeholder")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyDefaultValue(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Value</label>
      <input
        type={props.type}
        value={props.value}
        onChange={(event) => props.handleChange(event, "value")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyCalculationValue(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Calculation</label>
      <span className="property-text-highlight" onClick={props.handleChange}>
        {" "}
        Add a calculation{" "}
      </span>
    </div>
  );
}

export function PropertyEditableValue(props) {
  return (
    <div className="property-input-box-row">
      <label className="property-name">Editable</label>
      <input
        type="checkbox"
        checked={props.value}
        onChange={(event) => props.handleChange(event, "editable")}
      />
    </div>
  );
}

export function PropertyFieldRequired(props) {
  return (
    <div className="property-input-box-row">
      <label className="property-name">Required</label>
      <input
        type="checkbox"
        checked={props.value}
        onChange={(event) => props.handleChange(event, "required")}
      />
    </div>
  );
}

export function PropertyMinLength(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Min Length/Value</label>
      <input
        type="number"
        value={props.value}
        onChange={(event) => props.handleChange(event, "minLength")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyMaxLength(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Max Length/Value</label>
      <input
        type="number"
        value={props.value}
        onChange={(event) => props.handleChange(event, "maxLength")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyValidationRegex(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Regex</label>
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.handleChange(event, "regex")}
        className="property-text-field"
      />
    </div>
  );
}

export function PropertyValidation(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Validation</label>
      <span className="property-text-highlight" onClick={props.handleChange}>
        {" "}
        Add a condition{" "}
      </span>
    </div>
  );
}
export function PropertyValidationError(props) {
  return (
    <div className="property-input-box">
      <label className="property-name">Validation Error</label>
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.handleChange(event, "validationError")}
        className="property-text-field"
      />
    </div>
  );
}

function PropertyOptions(props) {
  const handleOptionChange = (event, index) => {
    const updatedOptions = [...props.questionItem.value.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      value: event.target.value,
    };
    props.updateProperty(props.questionItem.id, "value", {
      options: updatedOptions,
    });
  };
  const handleAddOption = () => {
    const updatedOptions = [...props.questionItem.value.options];
    const newOption = { value: "" };

    // Add the new option to the end of the array
    updatedOptions.push(newOption);

    // Update the property with the modified options
    props.updateProperty(props.questionItem.id, "value", {
      options: updatedOptions,
    });
  };
  const handleDeleteOption = (index) => {
    const updatedOptions = [...props.questionItem.value.options];
    console.log(index);
    console.log(updatedOptions);
    updatedOptions.splice(index, 1);
    console.log(updatedOptions);

    props.updateProperty(props.questionItem.id, "value", {
      options: updatedOptions,
    });
  };

  return (
    <div className="property-input-box">
      <div className="property-input-box-row">
        <label className="property-name">Options</label>
        <button onClick={handleAddOption}>+</button>
      </div>
      {props.questionItem.value.options.map((option, index) => (
        <div className="property-input-box-row" key={index}>
          <input
            className="property-text-field"
            type="text"
            placeholder="Type your option!"
            value={option.value}
            onChange={(event) => handleOptionChange(event, index)}
          />
          <button onClick={() => handleDeleteOption(index)}>
            <img src={deleteIcon} alt="Settings Icon" className="icon-style" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function PropertyItems(props) {
  return (
    <div className="properties-container">
      <PropertyQuestionText
        value={props.questionItem.text}
        handleChange={props.handlePropertyChange}
      />
      {(props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea" ||
        props.questionItem.type === "telephone") && (
        <PropertyPlaceholderText
          value={props.questionItem.placeholder}
          handleChange={props.handlePropertyChange}
        />
      )}
      {(props.questionItem.type === "date" ||
        props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea") && (
        <PropertyDefaultValue
          value={props.questionItem.value}
          type={props.questionItem.type}
          handleChange={props.handlePropertyChange}
        />
      )}
      {props.questionItem.type === "number" && (
        <PropertyCalculationValue
          value={props.questionItem.text}
          handleChange={props.toggleCalculationModal}
        />
      )}

      {(props.questionItem.type === "date" ||
        props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea" ||
        props.questionItem.type === "file" ||
        props.questionItem.type === "telephone") && (
        <PropertyFieldRequired
          value={props.questionItem.required}
          handleChange={props.handlePropertyCheckbox}
        />
      )}
      {(props.questionItem.type === "date" ||
        props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea") && (
        <PropertyEditableValue
          value={props.questionItem.editable}
          handleChange={props.handlePropertyCheckbox}
        />
      )}
      {(props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea") && (
        <PropertyMinLength
          value={props.questionItem.minLength}
          handleChange={props.handlePropertyChange}
        />
      )}
      {(props.questionItem.type === "number" ||
        props.questionItem.type === "text" ||
        props.questionItem.type === "textarea") && (
        <PropertyMaxLength
          value={props.questionItem.maxLength}
          handleChange={props.handlePropertyChange}
        />
      )}
      {(props.questionItem.type === "number" ||
        props.questionItem.type === "text") && (
        <PropertyValidation
          value={props.questionItem.text}
          handleChange={props.toggleValidationModal}
        />
      )}
      {(props.questionItem.type === "number" ||
        props.questionItem.type === "text") && (
        <PropertyValidationError
          value={props.questionItem.validationError}
          handleChange={props.handlePropertyChange}
        />
      )}
      {/* {(props.questionItem.type === "number" ||
        props.questionItem.type === "text") && (
        <PropertyValidationRegex
          value={props.questionItem.regex}
          handleChange={props.handlePropertyChange}
        />
      )} */}
      {(props.questionItem.type === "multiple-choice" ||
        props.questionItem.type === "single-choice") && (
        <PropertyOptions
          questionItem={props.questionItem}
          handleChange={props.handlePropertyChange}
          updateProperty={props.updateProperty}
        />
      )}
    </div>
  );
}
