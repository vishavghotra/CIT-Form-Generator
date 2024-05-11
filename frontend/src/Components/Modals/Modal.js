import React, { useState } from "react";

const renderQuestionOptions = (questions, type, isInput, isCalculation) => {
  let questionOptions = [];
  if (isCalculation === true) {
    questionOptions = questions
      .filter((question) => question.type === "number")
      .map((question, index) => (
        <option key={question.id} value={question.id}>
          {index + 1}. {question.text}
        </option>
      ));
  } else {
    questionOptions = questions
      .filter(
        (question) => question.type === "number" || question.type === "text"
      )
      .map((question, index) => (
        <option key={question.id} value={question.id}>
          {index + 1}. {question.text}
        </option>
      ));
  }
  if (isInput === true) {
    questionOptions.unshift(
      <option key="enterNumber" value="enterNumber">
        Enter a {type}
      </option>
    );
  }

  // Add a placeholder option
  questionOptions.unshift(
    <option key="placeholder" value="default" disabled>
      Add your question
    </option>
  );

  return questionOptions;
};

const renderBrackets = (bracket) => {
  const bracketsOptions = [
    <option key="placeholder" value="default"></option>,
    <option key={bracket} value={bracket}>
      {bracket}
    </option>,
  ];

  return bracketsOptions;
};

const selectOperatorArray = (isCalculation, type) => {
  if (isCalculation === true) {
    return ["+", "-", "*", "/"];
  } else if (type === "number") {
    return ["<", ">", "==", "!=", "<=", ">="];
  } else if (type === "text") {
    return ["equals", "not equals", "contains", "begins with", "ends with"];
  } else return [];
};
// Function to generate options for operator menus
const renderOperatorOptions = (isCalculation, type) => {
  // Add a placeholder option
  const operatorOptions = selectOperatorArray(isCalculation, type).map(
    (operator) => (
      <option key={operator} value={operator}>
        {operator}
      </option>
    )
  );

  operatorOptions.unshift(
    <option key="placeholder" value="default" disabled>
      Operator
    </option>
  );

  return operatorOptions;
};

const selectLastMenuOptions = (isCalculation) => {
  if (isCalculation === true) {
    return ["+", "-", "*", "/"];
  } else return ["And", "Or"];
};

// Function to generate options for the last menu
const renderLastMenuOptions = (isCalculation) => {
  const operatorOptions = selectLastMenuOptions(isCalculation).map(
    (operator) => (
      <option key={operator} value={operator}>
        {operator}
      </option>
    )
  );

  // Add a placeholder option
  operatorOptions.unshift(
    <option key="default" value="default">
      END
    </option>
  );

  return operatorOptions;
};

const QuestionSelect = (props) => {
  return (
    <select
      defaultValue={props.value}
      className="option-question"
      onChange={(e) => props.handleQuestionInputChange(true, e.target.value)}
    >
      {renderQuestionOptions(
        props.questions,
        props.type,
        props.isInput,
        props.isCalculation
      )}
    </select>
  );
};

const InputSelect = (props) => {
  return (
    <div className="calculation-area option-question background-white">
      <input
        placeholder={`Enter a ${props.type}`}
        value={props.value}
        className="option-input"
        onChange={(e) => props.handleQuestionInputChange(false, e.target.value)}
      />
      <button
        onClick={props.inputToDropDown}
        className="option-button background-white"
      >
        ▾
      </button>
    </div>
  );
};

export const QuestionAndInputSelect = (props) => {
  const [isDropDown, setIsDropDown] = useState(props.value.dropDown);
  const handleDropDownChange = () => {
    setIsDropDown(!isDropDown);
  };
  const inputToDropDown = () => {
    props.handleModalObjectChange(props.id, {
      dropDown: true,
      value: "default",
    });
    handleDropDownChange();
  };
  const handleQuestionInputChange = (newDropDown, newValue) => {
    if (newValue === "enterNumber") {
      props.handleModalObjectChange(props.id, {
        dropDown: false,
        value: "",
      });
      handleDropDownChange();
    } else {
      console.log(props.id, newDropDown, newValue);
      props.handleModalObjectChange(props.id, {
        dropDown: newDropDown,
        value: newValue,
      });
    }
  };

  //   const QuestionOrInputSelect = (props) => {
  //     return (
  //       <div>
  //         {isDropDown && (
  //           <QuestionSelect
  //             value={props.value.value}
  //             questions={props.questions}
  //             type={props.type}
  //           />
  //         )}
  //         {!isDropDown && (
  //           <InputSelect value={props.value.value} type={props.type} />
  //         )}
  //       </div>
  //     );
  //   };
  return (
    <div>
      {!props.isInput && (
        <QuestionSelect
          value={props.value.value}
          questions={props.questions}
          type={props.type}
          isInput={props.isInput}
          isCalculation={props.isCalculation}
          handleQuestionInputChange={handleQuestionInputChange}
        />
      )}
      {props.isInput && (
        <div>
          {isDropDown && (
            <QuestionSelect
              value={props.value.value}
              questions={props.questions}
              type={props.type}
              isInput={props.isInput}
              isCalculation={props.isCalculation}
              handleQuestionInputChange={handleQuestionInputChange}
            />
          )}
          {!isDropDown && (
            <InputSelect
              value={props.value.value}
              type={props.type}
              handleQuestionInputChange={handleQuestionInputChange}
              inputToDropDown={inputToDropDown}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const OperatorSelect = (props) => {
  return (
    <select
      defaultValue={props.value}
      className="option-operator"
      onChange={(e) => props.handleModalObjectChange(props.id, e.target.value)}
    >
      {renderOperatorOptions(props.isCalculation, props.type)}
    </select>
  );
};

export const OpenBracketSelect = (props) => {
  return (
    <select
      defaultValue={props.value}
      className="option-bracket"
      onChange={(e) => props.handleModalObjectChange(props.id, e.target.value)}
    >
      {renderBrackets("(")}
    </select>
  );
};

export const CloseBracketSelect = (props) => {
  return (
    <select
      defaultValue={props.value}
      className="option-bracket"
      onChange={(e) => props.handleModalObjectChange(props.id, e.target.value)}
    >
      {renderBrackets(")")}
    </select>
  );
};

export const LastMenuSelect = (props) => {
  return (
    <select
      defaultValue={props.value}
      onChange={(e) => props.handleLastMenuChange(props.id, e.target.value)}
      className="option-operator"
    >
      {renderLastMenuOptions(props.isCalculation)}
    </select>
  );
};

const isValidOperandsAndOperator = (sequence) => {
  for (const item of sequence) {
    if (item.type === "Question" && item.value.dropDown) {
      // Check if operand is not default
      if (item.value.value === "default") {
        return false;
      }
    } else if (item.type === "Operator") {
      // Check if operator is not default
      if (item.value === "default") {
        return false;
      }
    }
  }
  return true;
};
const isValidBrackets = (sequence) => {
  const stack = [];

  const bracketMap = {
    OpenBracket: "CloseBracket",
    CloseBracket: "OpenBracket",
  };

  for (const item of sequence) {
    if (
      (item.type === "OpenBracket" || item.type === "CloseBracket") &&
      item.value !== "default"
    ) {
      if (item.type === "OpenBracket") {
        stack.push(item);
      } else {
        const top = stack.pop();

        if (!top || top.type !== bracketMap[item.type]) {
          return false;
        }
      }
    }
  }
  return stack.length === 0;
};

export const isSequenceValid = (sequence) => {
  return isValidBrackets(sequence) && isValidOperandsAndOperator(sequence);
};
