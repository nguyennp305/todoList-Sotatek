import React, { useEffect } from "react";
import "./TodoList.scss";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Task from "../../components/Task/Task";
import axios from "axios";
import config from "../../config";

const TodoList = (props) => {
  const [listTask, setListTask] = useState([]);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  useEffect(() => {
    //sort by dueDate
    props.listTask.sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setListTask(props.listTask);
  }, [props.listTask]);

  const handleSearch = (e) => {
    const search = e.target.value;
    const newListTask = props.listTask.filter((task) => {
      return task.title.toLowerCase().includes(search.toLowerCase());
    });
    setListTask(newListTask);
  };

  useEffect(() => {
    for (let i = 0; i < listTask.length; i++) {
      if (listTask[i].done) {
        setOpenDeleteAll(true);
        break;
      } else {
        setOpenDeleteAll(false);
      }
    }
  }, [listTask, openDeleteAll]);

  const handleDeleteAll = () => {
    listTask.forEach((task) => {
      if (task.done) {
        axios.delete(`${config.api.url}/delete/${task.id}`);
      }
    });

    props.reload();
  };

  return (
    <div style={{ margin: "5%" }}>
      <div className="todo-list">
        <input type="text" placeholder="Search" onChange={handleSearch} />
      </div>
      {listTask.map((task) => {
        return <Task task={task} reload={() => props.reload()} />;
      })}
      {openDeleteAll && (
        <div className="bulk-action">
          <span style={{ width: "50%", minWidth: "150px", textAlign: "left" }}>
            Bulk action
          </span>
          <div style={{ width: "50%", minWidth: "150px", textAlign: "right" }}>
            <button
              type="submit"
              style={{ backgroundColor: "#FFFF33" }}
              onClick={handleDeleteAll}
            >
              Remove all task done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TodoList;
