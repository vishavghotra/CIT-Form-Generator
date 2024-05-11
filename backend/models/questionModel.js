const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  type: {
    type: String,
  },
  text: {
    type: String,
  },
  value: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: String,
    default: "",
  },
  calculationFormula: {
    type: mongoose.Schema.Types.Mixed,
  },
  validation: {
    type: mongoose.Schema.Types.Mixed,
  },
  validationError: {
    type: String,
    default: "",
  },
  editable: {
    type: Boolean,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  minLength: {
    type: String,
  },
  maxLength: {
    type: String,
  },
  regex: {
    type: String,
    default: "",
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
