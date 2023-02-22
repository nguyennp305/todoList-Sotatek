const express = require("express"),
  cors = require("cors"),
  app = express(),
  port = 8080;

app.use(cors());
app.use(express.json());

// danh sach tasks
let todolist = [];
//id
let id = 0;
//code
app
  .get("/todo", function (req, res) {
    res.send(todolist);
  })

  .post("/todo/add", (req, res) => {
    const { newTask } = req.body;
    if (newTask) {
      todolist.push({ ...newTask, id: id++ });
    }
    res.send(todolist);
  })

  .delete("/todo/delete/:id", function (req, res) {
    if (req.params.id != "") {
      //remove task with id
      todolist = todolist.filter((task) => task.id != req.params.id);
    }
    res.send(todolist);
  })

  .put("/todo/edit/:id", function (req, res) {
    const todoIdx = req.params.id;
    const { editTodo } = req.body;
    if (todoIdx && editTodo) {
      todolist = todolist.map((task) => {
        if (task.id == todoIdx) {
          return { ...editTodo, id: todoIdx };
        }
        return task;
      });
    }
    res.send(todolist);
  })

  //search
  .get("/todo/:id", function (req, res) {
    const todoIdx = req.params.id;
    const todo = todolist.filter((task) => task.id == todoIdx)[0];

    if (todo) {
      res.send(todo);
    } else {
      res.send("undefined");
    }
  })

  .listen(port, function () {
    console.log(`Listen on port ${port}`);
  });

module.exports = app;
