const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
  formID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
  },
  responses: [
    {
      question: {
        type: String
      },
      answer: {
        type: String,
      },
    },
  ],
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
