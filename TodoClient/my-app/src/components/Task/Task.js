import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "../../config";

const Task = (props) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState();
  const [done, setDone] = useState();

  useEffect(() => {
    setId(props.task.id);
    setDueDate(new Date(props.task.dueDate));
    setTitle(props.task.title);
    setDescription(props.task.description);
    setPriority(props.task.priority);
    setDone(props.task.done);
  }, [props.task]);

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  const handleUpdate = (e) => {
    if (e) e.preventDefault();
    const editTodo = {
      title,
      description,
      dueDate: dueDate.toLocaleDateString(),
      priority,
      done: done,
    };

    console.log(editTodo);

    axios
      .put(`${config.api.url}/edit/${id}`, {
        editTodo: editTodo,
      })
      .then((res) => {
        props.reload();
      });
  };

  const handleDelete = () => {
    axios.delete(`${config.api.url}/delete/${id}`).then((res) => {
      console.log(res.data);
      props.reload();
    });
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleChangeDone = (e) => {
    if (e) e.preventDefault();
    //get all  of data in task without change done
    const editTodo = {
      ...props.task,
      done: !done,
    };

    console.log(editTodo);

    axios
      .put(`${config.api.url}/edit/${id}`, {
        editTodo: editTodo,
      })
      .then((res) => {
        setDone(!done);
        props.reload();
      });
  };

  return (
    <>
      {props.task && (
        <>
          <div className="a-work" key={id}>
            <div style={{ width: "60%", minWidth: "200px", textAlign: "left" }}>
              <input type="checkbox" checked={done} onClick={handleChangeDone} />
              <span>{title}</span>
            </div>
            <div style={{ width: "40%", minWidth: "100px", textAlign: "right" }}>
              <button type="submit" onClick={handleOpenUpdateModal} style={{ backgroundColor: "#99CCFF" }}>
                Detail
              </button>
              <button type="submit" style={{ backgroundColor: "#FFFF33" }} onClick={handleDelete}>
                Remove
              </button>
            </div>
          </div>
          {openUpdateModal && (
            <form className="form-update">
              <div className="update">
                <input type="text" value={title} />
                <div>
                  <div style={{ display: "flex" }}>Description</div>
                  <textarea value={description} onChange={handleChangeDescription} />
                </div>
                <div className="date-and-piority row">
                  <div className="col due-date">
                    <div style={{ display: "flex" }}>Due Date</div>
                    <DatePicker
                      // showIcon
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                    />
                  </div>
                  <div className="col piority">
                    <div style={{ display: "flex" }}>Piority</div>
                    <select className="form-select" value={priority} onChange={handleChangePriority}>
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="hight">Hight</option>
                    </select>
                  </div>
                </div>
                <div className="button-update">
                  <button type="submit" onClick={handleUpdate}>
                    update
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Task;
