const express = require("express");
const router = express.Router();
const Answer = require("../models/answerModel");
const nodemailer = require("nodemailer");
const multer = require("multer");

const upload = multer();
function createResponseBody(questionAndAnswers) {
  const emailContent = Array.from(questionAndAnswers)
    .map((item) => {
      return `<div style='margin-bottom: 10px;'>
                <span style='font-size: 18px;'><strong>${item.question}</strong></span>
                <br/>
                <span style='font-size: 16px; white-space: pre-line;'>${item.answer}</span>
            </div>`;
    })
    .join("");
  return emailContent;
}

function sendEmail(emailContent, files, emailAddress) {
  // Use nodemailer to send an email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.REACT_APP_GEN_EMAIL,
      pass: process.env.REACT_APP_EMAIL_PASS,
    },
  });

  let hello = "<div style='font-family: Arial, sans-serif; color: black;'>";
  hello += "<p style='font-size: 24px;'>Hello,</p>";
  hello += "<p style='font-size: 22px;'>Here is the response from a user:</p>";
  hello += emailContent;
  hello += "</div>";
  console.log(hello);
  const mailOptions = {
    from: "formbuilder330@gmail.com",
    to: emailAddress,
    subject: "Form Submission",
    html: hello,
  };

  // Check if there are files to attach
  if (files && files.length > 0) {
    // Attach files if available
    mailOptions.attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer, // File content as a buffer
    }));
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

router.get("/", async (req, res) => {
  try {
    const answers = await Answer.find();
    res.json(answers);
  } catch {
    console.error("error with get answers");
  }
});

router.post("/submit-answer", upload.any(), async (req, res) => {
  try {
    console.log("hello entered!");
    console.log(req.body);
    console.log(req.files);
    const questionAndAnswers = JSON.parse(req.body["questionAnswer"]);
    const responseBody = createResponseBody(questionAndAnswers);
    sendEmail(responseBody, req.files, req.body["email-address"]);
    res.status(201).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="https://www.moodle.tum.de/pluginfile.php/1/theme_boost_union/favicon/64x64/1712905369/favicon.ico">
  <title>Form Submission Success</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      min-height: 100vh;
      padding-top: 20px;
      background-color: #bdcad9;
      background-image: linear-gradient(315deg, #bdcad9 0%, #e1dada 74%);
    }

    .container {
      width: 70vw;
    }

    h1 {
      color: #333;
      font-size: 2em;
    }

    p {
      color: #666;
      font-size: 1.2em;
      margin-bottom: 20px;
      width: 100%;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank you for your submission!</h1>
    <p>Your form has been submitted successfully.</p>
    <p>${responseBody}</p>
  </div>
</body>
</html>

  `);
  } catch (error) {
    console.error(error);
    res.send(`
      <html>
        <head>
          <title>Internal Server Error</title>
        </head>
        <body>
          <h1>Internal Server Error</h1>
          <p>There was an error processing your request. Please try again later.</p>
        </body>
      </html>
    `);
  }
});

module.exports = router;
