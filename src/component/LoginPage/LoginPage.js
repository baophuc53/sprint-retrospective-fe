import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Switch, Redirect, Link } from "react-router-dom";
import config from "../../config/config.json";
import Axios from "axios";
import "./css/LoginPage.css";

const LoginPage = (props) => {
  //console.log(props);
  const id = localStorage.getItem("id");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  Axios.defaults.withCredentials = true;
  const onLogin = () => {
    Axios.post(`${config.dev.path}/user`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("id", res.data.data.userId);
          window.location.href = "/home";
        }
        else alert("Wrong user name or password!");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  return (
    <>
      {!id ? (
        <>
          <div className="d-flex justify-content-center">
            <Card className="login-form shadow">
              <Card.Title className="mt-4">
                <h3>Login</h3>
              </Card.Title>
              <Card.Body className="mr-3 ml-3">
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button onClick={onLogin}>Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};
const Login = withRouter(LoginPage);
export default Login;
