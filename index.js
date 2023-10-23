const express = require("express");
const app = express();
const Todo = require("./models/todo");
const mongoose = require("mongoose");

// View engine setup
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

// get all todos from DB
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  console.log(todos);
  res.send("Requested data from Mongo");
});

app.post("/api/todos", async (req, res) => {
  // in this post route I will take in a request and attempt to save a todo in a mongo docker container
  const { task, priority } = req.query;

  const newTodo = new Todo({
    task: task,
    priority: priority,
  });

  await newTodo.save();
  console.log("saved todo!");
  // const { task, priority } = req.body;
  // console.log(task, priority);
  res.send(
    `You have saved task: ${task} with priority: ${priority} to mongoDB`
  );
});

// logic to connect to mongo db
// first specify the mongodb connect url (this will be the address of our mongoDB docker container)
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/todoApp";
console.log(process.env.DB_URL);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//new connection logic,, before I used .then and .catch
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
