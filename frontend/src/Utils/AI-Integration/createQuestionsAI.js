import axios from "axios";
import { v4 as uuid } from "uuid";
import { calculation, validation } from "../declaration";

const createQuestion = (question, type) => {
  if (type === "multiple-choice" || type === "single-choice") {
    return {
      id: uuid(),
      type: type,
      text: question,
      value: { options: [{ value: "" }, { value: "" }, { value: "" }] },
      placeholder: "",
      defaultValue: "",
      calculationFormula: calculation,
      validation: validation,
      validationError: "",
      editable: true,
      required: false,
      minLength: "",
      maxLength: "",
      regex: "",
    };
  } else if (type === "address") {
    return {
      id: uuid(),
      type: type,
      text: question,
      value: { hausNr: "", str: "", plz: "", ort: "", land: "" },
      placeholder: "",
      defaultValue: "",
      calculationFormula: calculation,
      validation: validation,
      validationError: "",
      editable: true,
      required: false,
      minLength: "",
      maxLength: "",
      regex: "",
    };
  } else if (type === "name") {
    return {
      id: uuid(),
      type: type,
      text: question,
      value: { nachname: "", vorname: "" },
      placeholder: "",
      defaultValue: "",
      calculationFormula: calculation,
      validation: validation,
      validationError: "",
      editable: true,
      required: false,
      minLength: "",
      maxLength: "",
      regex: "",
    };
  } else {
    return {
      id: uuid(),
      type: type,
      text: question,
      value: "",
      placeholder: "",
      defaultValue: "",
      calculationFormula: calculation,
      validation: validation,
      validationError: "",
      editable: true,
      required: false,
      minLength: "",
      maxLength: "",
      regex: "",
    };
  }
};

function extractQuestions(jsonObject) {
  try {
    if (
      jsonObject &&
      jsonObject.questions &&
      Array.isArray(jsonObject.questions)
    ) {
      const isArrayOfValidObjects = jsonObject.questions.every(
        (questionObj) =>
          typeof questionObj === "object" &&
          questionObj.hasOwnProperty("question") &&
          typeof questionObj.question === "string" &&
          questionObj.hasOwnProperty("answer_type") &&
          typeof questionObj.answer_type === "string"
      );
      if (isArrayOfValidObjects) {
        return jsonObject.questions.map((q) => {
          return createQuestion(q.question, q.answer_type);
        });
      } else
        return [
          {
            id: uuid(),
            type: "text",
            text: "",
            value: "",
            placeholder: "",
            defaultValue: "",
            calculationFormula: calculation,
            validation: validation,
            validationError: "",
            editable: true,
            required: false,
            minLength: "",
            maxLength: "",
            regex: "",
          },
        ];
    } else {
      throw new Error("Invalid input: 'questions' property is not an array.");
    }
  } catch (error) {
    console.log("catched following error:")
    console.error(error.message);
    return [
      {
        id: uuid(),
        type: "text",
        text: "",
        value: "",
        placeholder: "",
        defaultValue: "",
        calculationFormula: calculation,
        validation: validation,
        validationError: "",
        editable: true,
        required: false,
        minLength: "",
        maxLength: "",
        regex: "",
      },
    ];
  }
}

// Function to show the loading spinner
function showLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'block';
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'none';
}

export const generateQuestions = async (userInput, setNewQuestions) => {
  try {
    showLoadingSpinner()
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-1106-preview",
        //model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        messages: [
          // {
          //   role: "system",
          //   content:
          //     "You will be provided with a form description by user. Your job would be to return questions that can be asked in this form along with answer type. Your response must be in JSON format and it must always be in this format: [{question:  answer_type:}]. If the user input is in the german language then the questions formulated by you must be in the german language else they should be in english .Questions should not be too long and too short.",
          // },
          {
            role: "user",
            content: `Your task is to generate questions and their corresponding answer types based on a provided form description. The form description, given by the user, will be either in English or German language. Ensure that the questions are concise, neither too long nor too short. Return the output in JSON format. Follow this Pydantic specification for output:
              class Question(BaseModel):
                question: str
                answer_type: Literal["text", "number", "date", "telephone", "name", "address", "single-choice", "yes/no", "multiple_choice", "textarea"]
  
              class Form(BaseModel):
                questions: conlist(item_type=Question)
              . Here is the form description by the user: "${userInput}". Your goal is to generate between 4 to 8 questions. Questions should be in the same language as the form description given by user.`,
          },
        ],
        max_tokens: 457, // Adjust as needed
        temperature: 0.5,
        top_p: 0.2,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            process.env.REACT_APP_API_KEY, 
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    console.log(response.data.usage.total_tokens);
    const questions = extractQuestions(
      JSON.parse(response.data.choices[0].message.content)
    );
    setNewQuestions(questions);
    hideLoadingSpinner()
  } catch (error) {
    hideLoadingSpinner()
    console.error("Error generating questions:", error);
  }
};
