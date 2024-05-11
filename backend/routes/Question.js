const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel')

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch {
    console.error("error with get questions")
  }
})

router.post('/create-question', async (req, res) => {
    try {
      console.log(req.body)
      const {question} = req.body;
      const {
        id,
        type,
        text,
        value,
        placeholder,
        defaultValue,
        calculationFormula,
        validation,
        validationError,
        editable,
        required,
        minLength,
        maxLength,
        regex,
      } = question;

      // Create a new question
      const questionToAdd = new Question({
        id,
        type,
        text,
        value,
        placeholder,
        defaultValue,
        calculationFormula,
        validation,
        validationError,
        editable,
        required,
        minLength,
        maxLength,
        regex,
      });
      const savedQuestion = await questionToAdd.save();
      console.log(savedQuestion)
     // const questions = await Question.find();
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;