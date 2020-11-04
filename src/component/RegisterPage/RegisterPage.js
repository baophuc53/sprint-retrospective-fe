import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Switch, Redirect, Link } from "react-router-dom";
import config from "../../config/config.json";
import Axios from "axios";
import "./css/RegisterPage.css";

const RegisterPage = (props) => {
  //console.log(props);
  const id = localStorage.getItem("id");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  //Axios.defaults.withCredentials = true;
  const onRegister = () => {
    if (password && name && username) {
      if (password !== confirm) alert("Confirm password incorrect!");
      else {
        Axios.post(`${config.dev.path}/user/add`, { name, username, password })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              window.location.href = "/login";
            } else {
                alert("Register fail!");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    }
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
              <Button onClick={onRegister}>Register</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
// const Login = withRouter(LoginPage);
export default RegisterPage;
