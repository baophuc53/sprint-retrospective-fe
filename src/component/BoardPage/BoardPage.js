import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import config from "../../config/config.json";
import Axios from "axios";
import "./css/BoardPage.css";

const BoardPage = (props) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(-1);
  const [editTaskName, setEditTaskName] = useState("");
  useEffect(() => {
    Axios.get(`${config.dev.path}/board/${props.match.params.id}`)
      .then((res) => {
        if (res.data.code === 0) {
          const list = res.data.data.list.map((item) => ({
            id: item.id,
            name: item.name,
            col: item.column_name,
          }));
          setTasks(list);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);
  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDragStart = (ev, name) => {
    ev.dataTransfer.setData("id", name);
  };

  const onDrop = (ev, cat) => {
    const id = ev.dataTransfer.getData("id");
    const entity = {};
    let curTasks = tasks.filter((task) => {
      if (task.name === id) {
        entity.id = task.id;
        entity.name = id;
        entity.column_name = cat;
        task.col = cat;
      }
      return task;
    });
    if (cat !== "trash") {
      Axios.post(
        `${config.dev.path}/board/patch/${props.match.params.id}`,
        entity
      ).then((res) => {
        if (res.data.code === 0) {
          setTasks(curTasks);
        }
      });
    } else {
      Axios.post(`${config.dev.path}/board/delete`, { id: entity.id }).then(
        (res) => {
          if (res.data.code === 0) setTasks(curTasks);
        }
      );
    }
  };

  const handleKeyPress = (ev) => {
    if (ev.key === "Enter" && ev.target.value !== "") {
      const newName = ev.target.value;
      Axios.post(`${config.dev.path}/board/add/${props.match.params.id}`, {
        board_id: props.match.params.id,
        name: newName,
        column_name: "wentwell",
      }).then((res) => {
        if (res.data.code === 0) {
          setTasks([
            ...tasks,
            { id: res.data.data.id, name: newName, col: "wentwell" },
          ]);
        }
      });
      ev.target.value = "";
    }
  };

  const editTask = (item) => {
    setEditTaskId(item.id);
    setEditTaskName(item.name);
  };

  const handleChange = (e) => {
    setEditTaskName(e.target.value);
  };

  const handleKeyPressEdit = (ev, t) => {
    if (ev.key === "Enter") {
      const entity = {
        id: t.id,
        name: ev.target.value,
        column_name: t.col,
      };

      console.log(tasks);
      if (ev.target.value !== t.name && ev.target.value !== "") {
        Axios.post(
          `${config.dev.path}/board/patch/${props.match.params.id}`,
          entity
        )
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              let curTasks = tasks.filter((task) => {
                if (task.id === entity.id) {
                  task.name = entity.name;
                }
                return task;
              });
              setTasks(curTasks);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
      setEditTaskId(-1);
    }
  };

  const column = {
    wentwell: [],
    toimprove: [],
    actionitem: [],
    trash: [],
  };
  tasks.forEach((t) => {
    column[t.col].push(
      <div
        className="item-container"
        key={t.name}
        draggable
        onDragStart={(e) => onDragStart(e, t.name)}
      >
        {t.id === editTaskId ? (
          <input
            className="input-edit-task"
            type="text"
            value={editTaskName}
            autoFocus
            onKeyPress={(e) => handleKeyPressEdit(e, t)}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          t.name
        )}
        <button
          className="btn-edit-task"
          onClick={(e) => {
            e.preventDefault();
            editTask(t);
          }}
        >
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
      </div>
    );
  });

  return (
    <div>
      <div id="background-image"></div>
      <div class="container-fluid">
        <div
          className="drop-area"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "wentwell")}
        >
          <h1>Went Well</h1>
          {column.wentwell}
        </div>
        <div
          className="drop-area"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "toimprove")}
        >
          <h1>To Improve</h1>
          {column.toimprove}
        </div>
        <div
          className="drop-area"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "actionitem")}
        >
          <h1>Action Items</h1>
          {column.actionitem}
        </div>
      </div>
      <div>
        <input
          onKeyPress={(e) => handleKeyPress(e)}
          className="input-task"
          type="text"
          placeholder="Task Name"
        />
        <div
          class="trash-drop"
          onDrop={(e) => onDrop(e, "trash")}
          onDragOver={(e) => onDragOver(e)}
        >
          Drop here to remove
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
