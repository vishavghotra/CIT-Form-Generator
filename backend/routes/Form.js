const express = require("express");
const router = express.Router();
const Form = require("../models/formModel");

router.get("/", async (req, res) => {
  try {
    const forms = await Form.find()
    res.json(forms)
  } catch(err) {
    console.error("error while fetching forms")
  }
})

router.post("/create-form", async (req, res) => {
  try {
    const { questions } = req.body;
    const form = new Form({ questions });

    const savedForm = await form.save();
    console.log(savedForm)
    console.log(savedForm._id);
    res.status(201).json(savedForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
