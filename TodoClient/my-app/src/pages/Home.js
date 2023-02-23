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
    setReload(!reload);
  };

  return (
    <div className="container" style={{minWidth: '580px', width: '100%'}}>
      <div className="page-main row">
        <div className="col col-left col-lg-6 col-md-12 col-sm-12">
          <div>
            <h2>
              <b>New Task</b>
            </h2>
          </div>
          <NewTask reload={reloadPage} />
        </div>
        <div className="col col-right col-lg-6 col-md-12-col-sm-12">
          <div>
            <h2>
              <b>Todo List</b>
            </h2>
          </div>
          <TodoList reload={reloadPage} listTask={listTask} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
