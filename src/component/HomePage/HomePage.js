import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import config from "../../config/config.json";
import Axios from "axios";
import "./css/HomePage.css";

function HomePage() {
  const [board, setBoard] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    Axios.get(`${config.dev.path}/board`)
      .then((res) => {
        if (res.data.code === 0) setBoard(res.data.data.boards);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const addBoard = (newBoardName) => {
    Axios.post(`${config.dev.path}/board`, { name: newBoardName }).then(
      (res) => {
        if (res.data.code === 0)
          setBoard([...board, { id: res.data.data.id, name: newBoardName }]);
      }
    );
  };

  const showListBoard = (board) => {
    const src =
      (board &&
        board.map((item, key) => (
          <Card className="board-card" key={key}>
            <Card.Body>{item.name}</Card.Body>
          </Card>
        ))) ||
      [];
    src.push(
      <Card className="board-card">
        <Card.Body onClick={() => setShowPopup(true)}>
          <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
        </Card.Body>
      </Card>
    );
    return src;
  };
  return (
    <>
      <Container className="d-flex">{showListBoard(board)}</Container>
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
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
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addBoard(newBoardName);
              setShowPopup(false);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomePage;
