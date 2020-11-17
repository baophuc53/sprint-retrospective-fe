import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import config from "../../config/config.json";
import copy from "copy-to-clipboard";
import Axios from "axios";
import "./css/HomePage.css";

const Home = () => {
  const [board, setBoard] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editItemID, setEditItemID] = useState(-1);
  const [editItemName, setEditItemName] = useState("");
  const [showDelPopup, setShowDelPopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(-1);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get(`${config.dev.path}/board`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.code === 0) setBoard(res.data.data.boards);
        else alert("dang nhap di");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const addBoard = (newBoardName) => {
    Axios.post(
      `${config.dev.path}/board`,
      { name: newBoardName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      if (res.data.code === 0)
        setBoard([...board, { id: res.data.data.id, name: newBoardName }]);
    });
  };

  const editBoard = (item) => {
    setEditItemID(item.id);
    setEditItemName(item.name);
  };

  const shareBoard = (id) => {
    Axios.get(`${config.dev.path}/board/share/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.code === 0) {
          setShareLink(
            `${config.app.path}/share-board/${res.data.data.shareToken}`
          );
          setShowSharePopup(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleKeyPress = (ev, item) => {
    const entity = {
      id: item.id,
      name: ev.target.value,
    };
    if (ev.key === "Enter") {
      if (ev.target.value !== item.name && ev.target.value !== "") {
        Axios.put(`${config.dev.path}/board`, entity, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.data.code === 0) {
              setEditItemID(-1);
              let curBoard = board.filter((b) => {
                if (b.id === entity.id) {
                  b.name = entity.name;
                }
                return b;
              });
              setBoard(curBoard);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
      setEditItemID(-1);
    }
  };

  const handleChange = (e) => {
    setEditItemName(e.target.value);
  };

  const showListBoard = (board) => {
    const src =
      (board &&
        board.map((item, key) => (
          <Link
            to={`/board/${item.id}`}
            key={key}
            draggable="false"
            onClick={(e) => {
              if (editItemID >= 0) e.preventDefault();
            }}
          >
            <Card className="board-card">
              <Card.Body>
                {item.id === editItemID ? (
                  <input
                    className="input-board"
                    type="text"
                    value={editItemName}
                    autoFocus
                    onBlur={(e) => {
                      setEditItemID(-1);
                    }}
                    onKeyPress={(e) => handleKeyPress(e, item)}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  item.name
                )}
                <div className="btn-group">
                  <button
                    className="btn-edit ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      editBoard(item);
                    }}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn-edit ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteItemId(item.id);
                      setShowDelPopup(true);
                    }}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
                <button
                  className="btn-share ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    shareBoard(item.id);
                  }}
                >
                  <i class="fa fa-share" aria-hidden="true"></i>
                </button>
              </Card.Body>
            </Card>
          </Link>
        ))) ||
      [];
    src.push(
      <Card className="add-card">
        <Card.Body
          className="align-items-center d-flex justify-content-center"
          onClick={() => setShowPopup(true)}
        >
          <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
        </Card.Body>
      </Card>
    );
    return src;
  };

  const closePopup = () => {
    setShowPopup(false);
    setNewBoardName("");
  };

  const deleteBoard = (id) => {
    console.log(id);
    Axios.delete(`${config.dev.path}/board`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    })
      .then((res) => {
        if (res.data.code === 0) {
          console.log("ok");
          const curBoard = board.filter((b) => {
            return b.id !== id;
          });
          setBoard(curBoard);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const showAddModal = () => {
    return (
      <Modal show={showPopup} onHide={() => closePopup()}>
        <Modal.Header closeButton>
          <Modal.Title>Add board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newBoardName}
                onChange={(e) => {
                  setNewBoardName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closePopup()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addBoard(newBoardName);
              closePopup();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const showDeleteModal = () => {
    return (
      <Modal show={showDelPopup} onHide={() => setShowDelPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete this board?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              deleteBoard(deleteItemId);
              setShowDelPopup(false);
            }}
          >
            Yes
          </Button>
          <Button variant="primary" onClick={() => setShowDelPopup(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const showShareModal = () => {
    return (
      <Modal show={showSharePopup} onHide={() => setShowSharePopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control as="textarea" rows={3} readOnly value={shareLink} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              copy(shareLink);
              setShowSharePopup(false);
            }}
          >
            Copy
          </Button>
          <Button variant="primary" onClick={() => setShowSharePopup(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <div className="list-board">{showListBoard(board)}</div>
      {showAddModal()}
      {showDeleteModal()}
      {showShareModal()}
    </>
  );
};
const HomePage = withRouter(Home);
export default HomePage;
