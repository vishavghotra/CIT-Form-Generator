import React from "react";
import Header from "../../Components/Header/Header";
import ItemList from "../../Components/ItemSideList/ItemList";
import ItemEditor from "../../Components/ItemEditor/ItemEditor";
import ExportModal from "../../Components/Modals/ExportModal";
import "../../App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { items } from "../../Utils/declaration";
import {
  handleConfiFormsDownload,
  handleExport,
  handleHTMLDownload,
} from "../../Utils/Export/exportFunctions";
import useFormViewHook from "./useFormView";

const FormView = () => {
  const {
    questions,
    title,
    exportModal,
    setNewQuestions,
    setTitle,
    toggleExportModal,
    updateQuestionByProperty,
    deleteQuestion,
    onDragEnd,
  } = useFormViewHook();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container">
        <Header
          handleExport={handleExport}
          toggleExportModal={toggleExportModal}
        />
        <div className="main-body">
          <ItemList items={items} />
          <ItemEditor
            columnId="editor"
            title={title}
            questions={questions}
            setNewQuestions={setNewQuestions}
            setTitle={setTitle}
            updateProperty={updateQuestionByProperty}
            deleteQuestion={deleteQuestion}
          />
        </div>
        {exportModal && (
          <ExportModal
            toggleExportModal={toggleExportModal}
            exportViaUrl={(email) => handleExport(title, questions,email)}
            exportAsHTML={() => handleHTMLDownload(title, questions)}
            exportViaConfiforms={() => handleConfiFormsDownload(title, questions)}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default FormView;
