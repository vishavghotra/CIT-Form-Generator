import React from "react";
import "./QuestionItem.css";

function Question(props) {
  if (props.type === "comment") {
    return;
  } else
    return (
      <input
        type="text"
        value={props.text}
        placeholder="Enter your question"
        onChange={props.handleQuestionChange}
        className="input-box borderless-box"
      />
    );
}

function CreateInputBox(props) {
  if (
    props.type === "text" ||
    props.type === "number" ||
    props.type === "date"
  ) {
    return (
      <input
        className="input-box"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        readOnly="readonly"
      />
    );
  } else if (props.type === "yes/no") {
    return (
      <input type="checkbox" className="checkbox-input" value={props.value} />
    );
  } else if (props.type === "file") {
    return (
      <input type="file" className="file-input" accept=".pdf,.txt" disabled />
    );
  } else if (props.type === "telephone") {
    return (
      <input
        type="tel"
        className="input-box"
        value={props.value}
        placeholder={props.placeholder}
        readOnly="readonly"
      />
    );
  } else if (props.type === "textarea") {
    return (
      <textarea
        className="textarea-input"
        rows={5}
        value={props.value}
        placeholder={props.placeholder}
        readOnly="readonly"
      />
    );
  } else if (props.type === "address") {
    return (
      <div className="vertical-positions">
        <div className="horizontal-positions">
          <input
            className="input-box"
            type={props.type}
            placeholder="Straße"
            value={props.value.str}
            onChange={(event) =>
              props.handleJSONValueChange("str", event.target.value)
            }
          />
          <input
            className="input-box"
            type={props.type}
            placeholder="Haus Nummer"
            value={props.value.hausNr}
            onChange={(event) =>
              props.handleJSONValueChange("hausNr", event.target.value)
            }
          />
        </div>
        <div className="horizontal-positions">
          <input
            className="input-box"
            type={props.type}
            placeholder="PLZ"
            value={props.value.plz}
            onChange={(event) =>
              props.handleJSONValueChange("plz", event.target.value)
            }
          />
          <input
            className="input-box"
            type={props.type}
            placeholder="Ort"
            value={props.value.ort}
            onChange={(event) =>
              props.handleJSONValueChange("ort", event.target.value)
            }
          />
        </div>
        <input
          className="input-box adress-country"
          type={props.type}
          placeholder="Land"
          value={props.value.land}
          onChange={(event) =>
            props.handleJSONValueChange("land", event.target.value)
          }
        />
      </div>
    );
  } else if (props.type === "name") {
    return (
      <div className="horizontal-positions">
        <input
          className="input-box"
          type="text"
          placeholder="Nachname"
          value={props.value.nachname}
          onChange={(event) =>
            props.handleJSONValueChange("nachname", event.target.value)
          }
        />

        <input
          className="input-box"
          type="text"
          placeholder="Vorname"
          value={props.value.vorname}
          onChange={(event) =>
            props.handleJSONValueChange("vorname", event.target.value)
          }
        />
      </div>
    );
  } else if (props.type === "multiple-choice") {
    return props.value.options.map((option, index) => (
      <div className="horizontal-positions" key={index}>
        <input type="checkbox" className="checkbox-input" readOnly />
        <input
          className="input-box"
          type="text"
          placeholder="Type your option!"
          value={option.value}
          onChange={(event) => props.handleOptionChange(event, index)}
        />
      </div>
    ));
  } else if (props.type === "single-choice") {
    return props.value.options.map((option, index) => (
      <div className="horizontal-positions" key={index}>
        <input type="radio" name={props.id} className="radio-input" readOnly />
        <input
          className="input-box"
          type="text"
          placeholder="Type your option!"
          value={option.value}
          onChange={(event) => props.handleOptionChange(event, index)}
        />
      </div>
    ));
  } else if (props.type === "comment") {
    return (
      <textarea
        className="borderless-box"
        rows={6}
        placeholder="Enter your comment here!"
        value={props.value}
        onChange={(event) => {
          props.updateProperty(props.id, "value", event.target.value);
        }}
      />
    );
  }
}

function SingleLineQuestionAnswer(props) {
  return (
    <div className="horizontal-positions question-and-input">
      <Question
        type={props.questionItem.type}
        text={props.questionItem.text}
        handleQuestionChange={props.handleQuestionChange}
      />
      <CreateInputBox
        id={props.questionItem.id}
        type={props.questionItem.type}
        value={props.questionItem.value}
        placeholder={props.questionItem.placeholder}
        updateProperty={props.updateProperty}
      />
    </div>
  );
}

function VerticalQuestionAnswer(props) {
  function handleJSONValueChange(key, value) {
    const newValue = {
      ...props.questionItem.value,
      [key]: value,
    };
    props.updateProperty(props.questionItem.id, "value", newValue);
  }
  const handleOptionChange = (event, index) => {
    const updatedOptions = [...props.questionItem.value.options];

    // Update the value of the specific option at the given index
    updatedOptions[index] = {
      ...updatedOptions[index],
      value: event.target.value,
    };

    // Call the updateProperty function with the updated options
    props.updateProperty(props.questionItem.id, "value", {
      options: updatedOptions,
    });
  };
  return (
    <div className="vertical-positions question-and-input">
      <Question
        text={props.questionItem.text}
        handleQuestionChange={props.handleQuestionChange}
      />
      <CreateInputBox
        id={props.questionItem.id}
        type={props.questionItem.type}
        value={props.questionItem.value}
        placeholder={props.questionItem.placeholder}
        handleOptionChange={handleOptionChange}
        handleJSONValueChange={handleJSONValueChange}
      />
    </div>
  );
}

export function QuestionAnswer(props) {
  if (
    props.questionItem.type === "yes/no" ||
    props.questionItem.type === "comment"
  ) {
    return (
      <SingleLineQuestionAnswer
        questionItem={props.questionItem}
        handleQuestionChange={props.handleQuestionChange}
        updateProperty={props.updateProperty}
      />
    );
  } else {
    return (
      <VerticalQuestionAnswer
        questionItem={props.questionItem}
        handleQuestionChange={props.handleQuestionChange}
        handleOptionChange={props.handleOptionChange}
        updateProperty={props.updateProperty}
      />
    );
  }
}
