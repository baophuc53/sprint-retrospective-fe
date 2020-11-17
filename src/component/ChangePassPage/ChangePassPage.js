import React, { useState } from "react";
import {Button, Card, Form, Modal } from "react-bootstrap";
import config from "../../config/config.json";
import Axios from "axios";

const RegisterPage = (props) => {
  //console.log(props);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  Axios.defaults.withCredentials = true;
  const onChangePass = () => {
    setIsFail(false);
    setIsConfirm(false);
    if (password && newPassword) {
      if (newPassword !== confirm) setIsConfirm(true);
      else {
        Axios.post(`${config.dev.path}/user/change-pass`, { password, newPassword }, {
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
    }
  };

  const createModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your password are changed successfully!</Form.Label>
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
            <h3>Change password</h3>
          </Card.Title>
          <Card.Body className="mr-3 ml-3">
            <Form>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="password"
                  onChange={(e) => setNewPass(e.target.value)}
                ></Form.Control>
                <Form.Label>Confirm New Password</Form.Label>
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
                <div className="alert">Change password fail!</div>
              ) : (
                <></>
              )}
              <Button onClick={onChangePass}>Change</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {createModal()}
    </>
  );
};
export default RegisterPage;
