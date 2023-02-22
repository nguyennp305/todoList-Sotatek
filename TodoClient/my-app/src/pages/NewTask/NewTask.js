import React from "react";
import { useState } from "react";
import "./NewTask.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import config from "../../config";

const NewTask = (props) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleChangetitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const handleChangedescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  const handledueDateChange = (date) => {
    setDueDate(date);
    console.log(date.toLocaleDateString());
  };
  const priorityHandler = (e) => {
    setPriority(e.target.value);
    console.log(priority);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate.toLocaleDateString(),
      priority: priority,
      done: false,
    };

    axios
      .post(`${config.api.url}/add`, { newTask: newTask })
      .then((res) => {
        console.log(res.data);
        props.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ margin: "5%" }}>
      <form>
        <div className="add-new-task">
          <input type="text" value={title} onChange={handleChangetitle} placeholder="Add new task..." />
          <div>
            <div style={{ display: "flex" }}>Description</div>
            <textarea onChange={handleChangedescription} value={description} />
          </div>
          <div className="date-and-piority row">
            <div className="col due-date">
              <div style={{ display: "flex" }}>Due Date</div>
              <DatePicker
                // showIcon
                selected={dueDate}
                onChange={handledueDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col piority">
              <div style={{ display: "flex" }}>Piority</div>
              <select className="form-select" aria-label="Default select example" onChange={priorityHandler} value={priority}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="hight">Hight</option>
              </select>
            </div>
          </div>
          <div className="button-add">
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewTask;
