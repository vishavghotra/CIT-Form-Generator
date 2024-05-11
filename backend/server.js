const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());

const answerRouter = require("./routes/Answer");

app.use("/answer", answerRouter);
app.post("/export", (req, res) => {
  const { fileName, formHTML } = req.body;
  const exportFolder = "/var/www/html/forms/";
  const filePath = path.join(exportFolder, fileName);


  // Write the HTML content to the new file
  fs.writeFile(filePath, formHTML, (err) => {
    if (err) {
      // Handle error
      console.error("Error exporting HTML file:", err);
      res.status(500).json({ error: "Failed to export HTML file", desc: err.message });
    } else {
      // Send success response
      res.status(200).json({ message: "HTML file exported successfully" });
    }
  });
});

app.listen(3001, () => {
  console.log("this server has started!");
});
