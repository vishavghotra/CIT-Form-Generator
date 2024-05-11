import { useState } from "react";
import {
  calculation,
  validation,
  questionsExamples,
} from "../../Utils/declaration";
import { v4 as uuid } from "uuid";

const useFormViewHook = () => {
  const [questions, setQuestions] = useState(questionsExamples);
  const [title, setTitle] = useState("")
  const [exportModal, setExportModal] = useState(false);

  const setNewQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const updateQuestionByProperty = (id, key, value) => {
    console.log(questions)
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [key]: value } : question
      )
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const toggleExportModal = () => {
    setExportModal(!exportModal);
  };

  const createQuestion = (type) => {
    if (type === "multiple-choice" || type === "single-choice") {
      return {
        id: uuid(),
        type: type,
        text: "",
        value: { options: [{ value: "" }, { value: "" }, { value: "" }] },
        placeholder: "",
        defaultValue: "",
        calculationFormula: null,
        validation: null,
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
        text: "",
        value: { hausNr: "", str: "", plz: "", ort: "", land: "" },
        placeholder: "",
        defaultValue: "",
        calculationFormula: null,
        validation: null,
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
        text: "",
        value: { nachname: "", vorname: "" },
        placeholder: "",
        defaultValue: "",
        calculationFormula: null,
        validation: null,
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
      };
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId === "editor") {
      console.log(source.droppableId);
      const draggedQuestion = questions.find(
        (question) => question.id === draggableId
      );
      const newQuestions = Array.from(questions);
      newQuestions.splice(source.index, 1);
      newQuestions.splice(destination.index, 0, draggedQuestion);
      setQuestions(newQuestions);
    } else {
      if (
        source.droppableId === "item-list" &&
        destination.droppableId === "editor"
      ) {
        const newQuestion = createQuestion(draggableId);
        const newQuestions = Array.from(questions);
        newQuestions.splice(destination.index, 0, newQuestion);
        setQuestions(newQuestions);
        console.log(newQuestions);
      }
    }
  };

  return {
    questions,
    title,
    exportModal,
    setNewQuestions,
    setTitle,
    toggleExportModal,
    updateQuestionByProperty,
    deleteQuestion,
    onDragEnd,
  };
};

export default useFormViewHook;
