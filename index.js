const express = require("express");

const app = express();

// View engine setup
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
