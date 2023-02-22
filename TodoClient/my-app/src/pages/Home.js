import "./Home.scss";
import React, { useEffect } from "react";
import NewTask from "./NewTask/NewTask";
import TodoList from "./TodoList/TodoList";
import { useState } from "react";
import axios from "axios";
import config from "../config";

const HomePage = () => {
  const [reload, setReload] = useState(false);
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    axios.get(`${config.api.url}`).then((res) => {
      setListTask(res.data);
    });
  }, [reload]);

  const reloadPage = () => {
    console.log("reload");
    setReload(!reload);
  };

  return (
    <div className="container">
      <div className="page-main row">
        <div className="col col-left">
          <div>New Task</div>
          <NewTask reload={reloadPage} />
        </div>
        <div className="col col-right">
          <div>Todo List</div>
          <TodoList reload={reloadPage} listTask={listTask} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
