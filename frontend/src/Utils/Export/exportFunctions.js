import axios from "axios";

const generateTextInput = (question) => {
  let textInputHtml = `<div class="vertical-positions question-and-input">
  <label class= "input-box" for="${question.id}">${question.text}</label>\n`;
  textInputHtml += `<input class="input-box" type="text" id="${question.id}" name="${question.id}" placeholder="${question.placeholder}" `;
  textInputHtml += `value="${question.value}" `;
  if (
    question.minLength !== null &&
    question.minLength.length > 0 &&
    !isNaN(question.minLength)
  ) {
    textInputHtml += `minlength="${question.minLength}" `;
  }
  if (
    question.maxLength !== null &&
    question.maxLength.length > 0 &&
    !isNaN(question.maxLength)
  ) {
    textInputHtml += `maxlength="${question.maxLength}" `;
  }
  if (question.editable === false) {
    textInputHtml += `readonly `;
  }
  if (question.required === true) {
    textInputHtml += `required `;
  }
  textInputHtml += "/>\n</div>";
  return textInputHtml;
};

const generateNumberInput = (question) => {
  let numberInputHtml = `<div class="vertical-positions question-and-input">
  <label class= "input-box" for="${question.id}">${question.text}</label>\n`;
  numberInputHtml += `<input class="input-box" type="number" id="${question.id}" name="${question.id}" placeholder="${question.placeholder}" `;
  numberInputHtml += `value="${question.value}" `;
  if (
    question.minLength !== null &&
    question.minLength.length > 0 &&
    !isNaN(question.minLength)
  ) {
    numberInputHtml += `min="${question.minLength}" `;
  }
  if (
    question.maxLength !== null &&
    question.maxLength.length > 0 &&
    !isNaN(question.maxLength)
  ) {
    numberInputHtml += `max="${question.maxLength}" `;
  }
  if (question.editable === false) {
    numberInputHtml += `readonly `;
  }
  if (question.required === true) {
    numberInputHtml += `required `;
  }
  numberInputHtml += ` step="any"/>\n</div>`;
  return numberInputHtml;
};

const generateTelephoneInput = (question) => {
  let telInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  telInputHtml += `<input class="input-box" type="tel" id="${question.id}" name="${question.id}" placeholder="${question.placeholder}" `;
  telInputHtml += `value="${question.value}" `;
  if (question.editable === false) {
    telInputHtml += `readonly `;
  }
  if (question.required === true) {
    telInputHtml += `required `;
  }
  telInputHtml += `/>\n</div>`;
  return telInputHtml;
};

const generateDateInput = (question) => {
  let dateInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  dateInputHtml += `<input class="input-box" type="date" id="${question.id}" name="${question.id}" placeholder="${question.placeholder}" `;
  dateInputHtml += `value="${question.value}" `;
  if (question.editable === false) {
    dateInputHtml += `readonly `;
  }
  if (question.required === true) {
    dateInputHtml += `required `;
  }
  dateInputHtml += `/>\n</div>`;
  return dateInputHtml;
};

const generateFileInput = (question) => {
  let dateInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  dateInputHtml += `<input class="input-box" type="file" id="${question.id}" name="${question.id}" accept=".pdf,.txt" `;
  if (question.required === true) {
    dateInputHtml += `required `;
  }
  dateInputHtml += `/>\n</div>`;
  return dateInputHtml;
};

const generateBoxInput = (question) => {
  let boxInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  boxInputHtml += `<textarea class="input-box" id="${question.id}" name="${question.id}" placeholder="${question.placeholder}" `;
  boxInputHtml += `value="${question.value}" rows=5 `;
  if (
    question.minLength !== null &&
    question.minLength.length > 0 &&
    !isNaN(question.minLength)
  ) {
    boxInputHtml += `minlength="${question.minLength}" `;
  }
  if (
    question.maxLength !== null &&
    question.maxLength.length > 0 &&
    !isNaN(question.maxLength)
  ) {
    boxInputHtml += `maxlength="${question.maxLength}" `;
  }
  if (question.editable === false) {
    boxInputHtml += `readonly `;
  }
  if (question.required === true) {
    boxInputHtml += `required `;
  }
  boxInputHtml += `>${question.value}</textarea>\n</div>`;
  return boxInputHtml;
};

const generateComment = (question) => {
  return `<p>${question.value}</p>`;
};

const generateCheckboxInput = (question) => {
  let checkboxInputHtml = `<div class="horizontal-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  checkboxInputHtml += `<input type="checkbox" id="${question.id}" name="${question.id}" `;
  if (question.required === true) {
    checkboxInputHtml += `required `;
  }
  checkboxInputHtml += `/>\n</div>`;
  return checkboxInputHtml;
};

const generateAddressInput = (question) => {
  let addressInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  addressInputHtml += `<div class="vertical-positions">`;
  addressInputHtml += `<div class="horizontal-positions">`;
  addressInputHtml += `<input class="input-box" type="text" id="${question.id}1" name="${question.id}" data-name="Str" placeholder="Straße" />`;
  addressInputHtml += `<input class="input-box" type="text" id="${question.id}2" name="${question.id}" data-name="Haus" placeholder="Haus Nummer"  />`;
  addressInputHtml += `</div>`;
  addressInputHtml += `<div class="horizontal-positions">`;
  addressInputHtml += `<input class="input-box" type="text" id="${question.id}3" name="${question.id}" data-name="PLZ" placeholder="PLZ"  />`;
  addressInputHtml += `<input class="input-box" type="text" id="${question.id}4" name="${question.id}" data-name="Ort" placeholder="Ort"  />`;
  addressInputHtml += `</div>`;
  addressInputHtml += `<input class="input-box adress-country" type="text" id="${question.id}5" name="${question.id}" data-name="Land" placeholder="Land" />`;
  addressInputHtml += `</div>`;
  addressInputHtml += `\n</div>`;
  return addressInputHtml;
};

const generateNameInput = (question) => {
  let nameInputHtml = `<div class="vertical-positions question-and-input">
  <label class="input-box" for="${question.id}">${question.text}</label>\n`;
  nameInputHtml += `<div class="horizontal-positions">`;
  nameInputHtml += `<input class="input-box" type="text" id="${question.id}" name="${question.id}" data-name="Nachname" placeholder="Nachname"  />`;
  nameInputHtml += `<input class="input-box" type="text" id="${question.id}2" name="${question.id}" data-name="Vorname" placeholder="Vorname" />`;
  nameInputHtml += `</div>`;
  nameInputHtml += `</div>`;
  return nameInputHtml;
};

const generateSingleChoice = (question) => {
  let singleChoiceInputHtml = `<div class="vertical-positions question-and-input">`;
  singleChoiceInputHtml += `<label class="input-box" for="${question.id}">${question.text}</label>\n`;
  singleChoiceInputHtml += `<div class="vertical-positions">`;
  singleChoiceInputHtml += question.value.options
    .map(
      (option, index) =>
        `<div class="horizontal-positions" key=${index}>
        <input type="radio" id="${question.id}${index}" name="${question.id}" class="radio-input" />
        <label for="${question.id}${index}" class="input-box">${option.value}</label>
    </div>`
    )
    .join("");
  singleChoiceInputHtml += `</div>
  </div>`;
  return singleChoiceInputHtml;
};

const generateMultipleChoice = (question) => {
  let multipleChoiceInputHtml = `<div class="vertical-positions question-and-input">`;
  multipleChoiceInputHtml += `<label class="input-box" for="${question.id}">${question.text}</label>\n`;
  multipleChoiceInputHtml += `<div class="vertical-positions">`;
  multipleChoiceInputHtml += question.value.options
    .map(
      (option, index) =>
        `<div class="horizontal-positions" key=${index}>
        <input type="checkbox" id="${question.id}${index}" name="${question.id}" class="checkbox-input" />
        <label class="input-box" for="${question.id}${index}">${option.value}</label>
    </div>`
    )
    .join("");
  multipleChoiceInputHtml += `</div>
  </div>\n`;
  return multipleChoiceInputHtml;
};

const createFetchValues = () => {
  return `
  function extractFormValues() {
    const formData = {};
  
    // Iterate over questions
  questions.forEach((question) => {
    const inputField = document.getElementById(question.id);

    // Check if the input field exists
    if (inputField) {
      // Extract value and add it to the formDataArray
      formDataArray.push({ question: question.id, answer: inputField.value });
    }
  });
  
    // Display the extracted data (you can modify this part based on your needs)
    console.log(formData);
    return formData
  }
  `;
};

const createValidateAndSubmit = () => {
  return `
  const validateAndSubmit = async (event) => {
    // Call validateForm
    const isValid = validateForm();

    if (isValid === false) {
      // Call the handleSubmit function
     // await handleSubmit('yourFormId');
     event.preventDefault();
      // Show success message (you can modify this part based on your needs)
      //alert('Submission successful');
    }

    // Return false to prevent the form from submitting if validation fails
    return isValid;
  };
  `;
};

const formBody = (questions, email) => {
  let formHTML = `<form action="https://formbuilder.ots.cit.tum.de/answer/submit-answer" enctype="multipart/form-data" method="POST" onsubmit="validateForm(event)">`;
  formHTML += `<div class="question-container">`;
  questions.forEach((question) => {
    switch (question.type) {
      case "text":
        formHTML += generateTextInput(question);
        break;
      case "number":
        formHTML += generateNumberInput(question);
        break;
      case "date":
        formHTML += generateDateInput(question);
        break;
      case "telephone":
        formHTML += generateTelephoneInput(question);
        break;
      case "textarea":
        formHTML += generateBoxInput(question);
        break;
      case "single-choice":
        formHTML += generateSingleChoice(question);
        break;
      case "multiple-choice":
        formHTML += generateMultipleChoice(question);
        break;
      case "address":
        formHTML += generateAddressInput(question);
        break;
      case "name":
        formHTML += generateNameInput(question);
        break;
      case "yes/no":
        formHTML += generateCheckboxInput(question);
        break;
      case "file":
        formHTML += generateFileInput(question);
        break;
      case "comment":
        formHTML += generateComment(question);
        break;
      default:
        formHTML += "";
    }
  });
  formHTML += `<input class="submit-button" type="submit" value="Submit">`;
  formHTML += `</div>`;
  formHTML += `<input name="email-address" type="hidden" value="${email}">`;
  formHTML += `<input type="hidden" name="questionAnswer" id="questionAnswer">`;
  formHTML += "</form>\n";
  console.log(formHTML);
  return formHTML;
};

const calculationJSFunction = (question, index) => {
  if (
    question.type !== "number" ||
    question.calculationFormula.valid === false
  ) {
    return "";
  } else {
    let functionBody = `function calculation${index}() { 
      document.getElementById('${question.id}').value = `;
    let eventListeners = `document.addEventListener('DOMContentLoaded', function () { \n`;
    question.calculationFormula.elements.forEach((element) => {
      if (element.value === "default") {
        functionBody += " ";
      } else if (element.type === "Question") {
        if (element.value.dropDown === true) {
          functionBody += `(convertToNumber(document.getElementById('${element.value.value}').value))`;
          eventListeners += `document.getElementById('${element.value.value}').addEventListener('input', calculation${index});\n`;
        } else {
          functionBody += ` (convertToNumber('${element.value.value}')) `;
        }
      } else {
        functionBody += ` ${element.value} `;
      }
    });
    functionBody += `\n}`;
    eventListeners += "})\n";
    return functionBody + "\n" + eventListeners;
  }
};
const parseStringComparators = (comparator) => {
  // ["equals", "not equals", "contains", "begins with", "ends with"]
  if (comparator === "equals") {
    return { isFunction: false, result: "===" };
  } else if (comparator === "not equals") {
    return { isFunction: false, result: "!==" };
  } else if (comparator === "contains") {
    return { isFunction: true, result: ".includes(" };
  } else if (comparator === "begins with") {
    return { isFunction: true, result: ".startsWith(" };
  } else if (comparator === "ends with") {
    return { isFunction: true, result: ".endsWith(" };
  } else {
    return { isFunction: false, result: "===" };
  }
};
const validationIfStatement = (question) => {
  if (
    (question.type !== "number" && question.type !== "text") ||
    question.validation.valid === false
  ) {
    console.log("here");
    return "";
  } else {
    let ifStatement = "if((";
    let functionLeft = false;
    question.validation.elements.forEach((element) => {
      if (element.value === "default") {
        ifStatement += "";
      } else if (element.type === "Question") {
        if (element.value.dropDown === true) {
          if (element.conditionType === "number") {
            ifStatement += `(convertToNumber(document.getElementById('${element.value.value}').value))`;
          } else
            ifStatement += `(document.getElementById('${element.value.value}').value)`;
        } else {
          if (element.conditionType === "number") {
            ifStatement += `(convertToNumber('${element.value.value}'))`;
          } else {
            ifStatement += `'${element.value.value}'`;
          }
        }
        if (functionLeft === true) {
          ifStatement += `)`;
          functionLeft = false;
        }
      } else if (
        element.type === "Operator" &&
        element.conditionType === "text"
      ) {
        const parsedComparator = parseStringComparators(element.value);
        ifStatement += parsedComparator.result;
        functionLeft = parsedComparator.isFunction;
      } else if (element.type === "LastMenu") {
        ifStatement += element.value === "And" ? "&&" : "||";
      } else ifStatement += ` ${element.value} `;
    });
    ifStatement += `) === false) {
        alert('${question.validationError}');
        event.preventDefault();
        return false;
      }\n`;
    return ifStatement;
  }
};
const formJSFunctions = (questions) => {
  let calculationCode = `function convertToNumber(value) {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue;
      } else {
        return 0;
      }
    }\n`;
  let ifStatements = "";
  questions.forEach((question, index) => {
    calculationCode += calculationJSFunction(question, index);
    ifStatements += validationIfStatement(question);
  });
  let validationCode = `function validateForm(event) {
        ${ifStatements}
        let questionAndAnswers = []
        questions.forEach((question) => {
          switch(question.type) {
            case "text":
            case "number":
            case "date":
            case "telephone":
            case "textarea":
                // Push the question and its corresponding answer into the array
                questionAndAnswers.push({
                    question: document.querySelector('label[for="' + question.id + '"]').textContent,
                    answer: document.getElementById(question.id).value
                });
                break;
            case "file":
              var fileInput = document.getElementById(question.id);
              var selectedFile = fileInput.files[0]; // Assuming only one file is selected
          
              // Initialize answer to an empty string
              var answer = "No file added!";

              // If a file is selected, set the answer to the file name
              if (selectedFile) {
                  var fileName = selectedFile.name;
                  answer = fileName;
              }
          
          
              questionAndAnswers.push({
                  question: document.querySelector('label[for="' + question.id + '"]').textContent,
                  answer: answer
              });
              break;
            case "yes/no":
              var inputElement = document.getElementById(question.id);
            
              // Determine the answer based on whether the input field is checked
              var answer = inputElement.checked;
  
              // Push the question and its corresponding answer into the array
              questionAndAnswers.push({
                  question: document.querySelector('label[for="' + question.id + '"]').textContent,
                  answer: answer
              });
              break;
            case "name":
              // Get the input elements corresponding to the question's id
              var firstNameInput = document.querySelector('input[name="' + question.id + '"][data-name="Vorname"]');
              var lastNameInput = document.querySelector('input[name="' + question.id + '"][data-name="Nachname"]');
              
              // Get the values of the first name and last name inputs
              var firstName = firstNameInput.value;
              var lastName = lastNameInput.value;

              // Construct the answer object with keys "Vorname" and "Nachname"
              var answer = "Vorname: " + firstName  + "&#10;" +
                  "Nachname: " + lastName;

              // Push the question and its corresponding answer into the array
              questionAndAnswers.push({
                  question: document.querySelector('label[for="' + question.id + '"]').textContent,
                  answer: answer
              });
              break; 
            case "address":  
              var streetInput = document.querySelector('input[name="' + question.id + '"][data-name="Str"]');
              var houseNumberInput = document.querySelector('input[name="' + question.id + '"][data-name="Haus"]');
              var zipCodeInput = document.querySelector('input[name="' + question.id + '"][data-name="PLZ"]');
              var cityInput = document.querySelector('input[name="' + question.id + '"][data-name="Ort"]');
              var countryInput = document.querySelector('input[name="' + question.id + '"][data-name="Land"]');
              
              // Get the values of the address fields
              var street = streetInput.value;
              var houseNumber = houseNumberInput.value;
              var zipCode = zipCodeInput.value;
              var city = cityInput.value;
              var country = countryInput.value;

              // Construct the answer array of JSON objects with newline characters
              var answer = 
                  "Straße: " + street + "&#10;" +
                  "Haus Nr: " + houseNumber + "&#10;" +
                  "PLZ: " + zipCode + "&#10;" +
                  "Ort: " + city + "&#10;" +
                  "Land: " + country;


              // Push the constructed answer array into the array
              questionAndAnswers.push({
                question: document.querySelector('label[for="' + question.id + '"]').textContent,
                answer: answer
              });
              break;
            case "single-choice":
              // Get the selected radio input element corresponding to the question's id
              var selectedRadioInput = document.querySelector('input[name="' + question.id + '"]:checked');
              
              // Determine the answer based on whether a radio input is selected
              var answer = selectedRadioInput ? document.querySelector('label[for="' + selectedRadioInput.id + '"]').textContent : "no option selected";
  
              // Push the question and its corresponding answer into the array
              questionAndAnswers.push({
                  question: document.querySelector('label[for="' + question.id + '"]').textContent,
                  answer: answer
              });
            break;
            case "multiple-choice":
              // Get all selected checkbox input elements corresponding to the question's id
              var selectedCheckboxInputs = document.querySelectorAll('input[name="' + question.id + '"]:checked');
              
              // Determine the answer based on selected checkbox inputs
              var answer = "";
              if (selectedCheckboxInputs.length > 0) {
                  // Iterate through selected checkbox inputs
                  selectedCheckboxInputs.forEach(function(input, index) {
                      var labelText = document.querySelector('label[for="' + input.id + '"]').textContent;
                      // If it's not the last selected option, concatenate with newline
                      if (index < selectedCheckboxInputs.length - 1) {
                          answer += labelText + "&#10;";
                      } else {
                          // If it's the last selected option, don't concatenate with newline
                          answer += labelText;
                      }
                  });
              } else {
                  // If no option is selected, set the answer accordingly
                  answer = "no option selected";
              }
  
              // Push the question and its corresponding answer into the array
              questionAndAnswers.push({
                  question: document.querySelector('label[for="' + question.id + '"]').textContent,
                  answer: answer
              });
            break;
          }        
        })
        const questionAndAnswersString = JSON.stringify(questionAndAnswers)
        console.log(questionAndAnswersString)
        document.getElementById('questionAnswer').value = questionAndAnswersString;
        return true;
    }
    `;
  console.log(questions);
  return `
    <script>
      const questions = ${JSON.stringify(questions)}
      console.log(questions)
      ${createFetchValues()}
      ${calculationCode}
      ${validationCode}
      ${createValidateAndSubmit()}
    </script>
  `;
};

const cssStyles = `
  <style>
  * {
  box-sizing: border-box;
  }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding-top: 30px;
    margin: 0;
    background-color: #bdcad9;
    background-image: linear-gradient(315deg, #bdcad9 0%, #e1dada 74%);
  }

  form {
    background-color: #ffffff;
    padding: 20px;
    width: 70vw;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label,p {
    width: 100%;
    word-wrap: break-word;
  }

  .question-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .adress-country {
    width: 50%;
    align-self: center;
  }
  
  .question-and-input {
    flex: 1;
  }
  
  .input-box {
    outline: none;
    line-height: 26px;
    flex: 1;
  }

  .input, input:placeholder {
    font-size: 16px;
  }

  .grow-horizontal {
    flex: 1;
  }

  .vertical-positions {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2px;
  }
  
  .horizontal-positions {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 10px;
  }

  .checkbox-input {
    height: 26px;
  }

  .radio-input {
    height: 26px;
  }

  .submit-button {
    background-color: #0065bd;
    color: #ffffff;
    width: 40%;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    align-self: center;
  }

  .submit-button:hover {
    background-color: #64a0c8
  }
  </style>`;
export const generateForm = (title, questions, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="shortcut icon" href="https://www.moodle.tum.de/pluginfile.php/1/theme_boost_union/favicon/64x64/1712905369/favicon.ico"/>
      <title>Form</title>
      ${cssStyles}
    </head>
    <body>
      <h2>${title}</h2>
      ${formBody(questions, email)}
      ${formJSFunctions(questions)}
    </body>
    </html>
    `;
};

export const handleExport = async (title, questions, email) => {
  try {
    const formHTML = generateForm(title, questions, email);
    const fileName = uid() + ".html";
    const response = await axios.post(
      "https://formbuilder.ots.cit.tum.de/export",
      {
        fileName: fileName,
        formHTML: formHTML,
      }
    );

    // If the API call is successful, open the URL in a new tab
    const url = "https://formbuilder.ots.cit.tum.de/forms/" + fileName;
    window.open(url, "_blank");
  } catch (error) {
    console.error("Export failed:", error.message);
    // Handle error as needed
  }
};

export const handleHTMLDownload = (title, questions) => {
  const blob = new Blob([generateForm(title, questions)], {
    type: "text/html",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "form_export.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// source: https://stackoverflow.com/a/53116778
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const createConfiFormsRegisterControl = (formId) => {
  return `
  <ac:structured-macro ac:name="confiform-entry-register" data-layout="default">
    <ac:parameter ac:name="formName">${formId}</ac:parameter>
    <ac:parameter ac:name="type">Embedded</ac:parameter>
    <ac:rich-text-body>
      <p />
    </ac:rich-text-body>
  </ac:structured-macro>
  `;
};

const createConfiFormsTextField = (question) => {
  let textfieldXML = `
		<ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
      <ac:parameter ac:name="fieldPlaceholder">${
        question.placeholder
      }</ac:parameter>
      <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
      <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
      <ac:parameter ac:name="type">${question.type}</ac:parameter>
      <ac:parameter ac:name="required">${question.required}</ac:parameter>
    </ac:structured-macro>
  `;
  return textfieldXML;
};

const createConfiFormsFileField = (question) => {
  const fileFieldXML = `
  <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="values">.pdf,.txt</ac:parameter>
        <ac:parameter ac:name="type">file</ac:parameter>
        <ac:parameter ac:name="required">${question.required}</ac:parameter>
    </ac:structured-macro>
  `;
  return fileFieldXML;
};

const createConfiFormsOptionField = (question, type) => {
  const valuesString = question.value.options
    .map((option, index) => `${index + 1}=${option.value}`)
    .join("|");
  const optionfieldXML = `
    <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="values">${valuesString}</ac:parameter>
        <ac:parameter ac:name="type">${type}</ac:parameter>
    </ac:structured-macro>
  `;
  return optionfieldXML;
};

const createConfiFormsCheckboxField = (question) => {
  return `
    <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="type">checkbox</ac:parameter>
        <ac:parameter ac:name="required">${question.required}</ac:parameter>
    </ac:structured-macro>
  `;
};

const createConfiFormsNameField = (question) => {
  return `
    <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
        <ac:parameter ac:name="fieldPlaceholder">Enter your first and last name</ac:parameter>
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="required">${question.required}</ac:parameter>
        <ac:parameter ac:name="type">text</ac:parameter>
    </ac:structured-macro>
  `;
};

const createConfiFormsAddressField = (question) => {
  return `
    <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
        <ac:parameter ac:name="fieldPlaceholder">Enter [street name] [house number] [ZIP code] [city] [country]</ac:parameter>
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="required">${question.required}</ac:parameter>
        <ac:parameter ac:name="type">text</ac:parameter>
    </ac:structured-macro>
  `;
};

const createConfiFormsTelephoneField = (question) => {
  return `
    <ac:structured-macro ac:name="confiform-field-definition" data-layout="default">
    <ac:parameter ac:name="fieldPlaceholder">${
      question.placeholder
    }</ac:parameter>
        <ac:parameter ac:name="fieldName">${uid()}</ac:parameter>
        <ac:parameter ac:name="fieldLabel">${question.text}</ac:parameter>
        <ac:parameter ac:name="required">${question.required}</ac:parameter>
        <ac:parameter ac:name="type">text</ac:parameter>
    </ac:structured-macro>
  `;
};

const createConfiFormsCode = (title, questions) => {
  const formId = uid();
  let confiformXML = `<ac:structured-macro ac:name="confiform" data-layout="default">
	<ac:parameter ac:name="formName">${formId}</ac:parameter>
  <ac:parameter ac:name="registrationFormTitle">${title}</ac:parameter>
  <ac:rich-text-body>`;
  questions.forEach((question) => {
    switch (question.type) {
      case "text":
      case "number":
      case "date":
      case "textarea":
        confiformXML += createConfiFormsTextField(question);
        break;
      case "telephone":
        confiformXML += createConfiFormsTelephoneField(question);
        break;
      case "file":
        confiformXML += createConfiFormsFileField(question);
        break;
      case "address":
        confiformXML += createConfiFormsAddressField(question);
        break;
      case "name":
        confiformXML += createConfiFormsNameField(question);
        break;
      case "yes/no":
        confiformXML += createConfiFormsCheckboxField(question);
        break;
      case "single-choice":
        confiformXML += createConfiFormsOptionField(question, "radio");
        break;
      case "multiple-choice":
        confiformXML += createConfiFormsOptionField(question, "checkbox_group");
        break;
    }
  });
  confiformXML += `</ac:rich-text-body>
  </ac:structured-macro>
  <p />`;
  confiformXML += `${createConfiFormsRegisterControl(formId)}`;
  return confiformXML;
};

export const handleConfiFormsDownload = (title, questions) => {
  const xmlString = createConfiFormsCode(title, questions);
  const blob = new Blob([xmlString], { type: "application/xml" });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "confiforms_export.xml";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
