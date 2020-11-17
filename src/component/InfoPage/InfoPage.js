import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import config from "../../config/config.json";
import Axios from "axios";

const InfoPage = (props) => {
  //console.log(props);
  const [name, setName] = useState("");
  const [isFail, setIsFail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get(`${config.dev.path}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 0) setName(res.data.data.name);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const onInfo = () => {
    if (name) {
      Axios.post(`${config.dev.path}/user/patch`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            setShowModal(true);
          } else {
            setIsFail(true);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  const createModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your info are changed successfully!</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              window.location.href = "/home";
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Card className="login-form shadow">
          <Card.Title className="mt-4">
            <h3>Infomation</h3>
          </Card.Title>
          <Card.Body className="mr-3 ml-3">
            <Form>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {isFail ? <div className="alert">Change fail!</div> : <></>}
              <Button onClick={() => {onInfo()}}>Change</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {createModal()}
    </>
  );
};
export default InfoPage;
