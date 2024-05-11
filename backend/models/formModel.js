const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  questions: [
    {
      questionID: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
       _id: false
    },
  ],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
