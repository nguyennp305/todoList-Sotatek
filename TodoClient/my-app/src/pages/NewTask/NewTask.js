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
  const [priority, setPriority] = useState("normal");

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

    var currentDate = new Date(); // Lấy giá trị ngày tháng hiện tại
    var selectedDate = new Date(dueDate); // Lấy giá trị ngày tháng được chọn trong DatePicker
  
    // Tạo đối tượng Date mới với các giá trị ngày tháng được chọn và ngày tháng hiện tại, nhưng đều có giờ, phút, giây và mili giây là 0
    var currentDateTimeZero = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    var selectedDateTimeZero = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0, 0);
  
    if (title === "") {
      window.alert("Title cannot be blank");
    } else  if (selectedDateTimeZero < currentDateTimeZero) {
      window.alert("Date cannot be in the past");

    }
    else {
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
  
        setDueDate(new Date());
        setTitle("");
        setDescription("");
        setPriority("normal");
    }

    
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
