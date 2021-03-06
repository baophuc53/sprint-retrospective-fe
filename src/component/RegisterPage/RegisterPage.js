import React, { useState } from "react";
import {Button, Card, Form, Modal } from "react-bootstrap";
import config from "../../config/config.json";
import Axios from "axios";
import "./css/RegisterPage.css";

const RegisterPage = (props) => {
  //console.log(props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  Axios.defaults.withCredentials = true;
  const onRegister = () => {
    setIsFail(false);
    setIsConfirm(false);
    if (password && name && username) {
      if (password !== confirm) setIsConfirm(true);
      else {
        Axios.post(`${config.dev.path}/user/add`, { name, username, password })
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
    }
  };

  const createModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>You are registered successfully!</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              window.location.href = "/login";
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
            <h3>Register</h3>
          </Card.Title>
          <Card.Body className="mr-3 ml-3">
            <Form>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirm(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {isConfirm ? (
                <div className="alert">Wrong confirm password!</div>
              ) : (
                <></>
              )}
              {isFail ? (
                <div className="alert">Register fail!</div>
              ) : (
                <></>
              )}
              <Button onClick={onRegister}>Register</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {createModal()}
    </>
  );
};
export default RegisterPage;
