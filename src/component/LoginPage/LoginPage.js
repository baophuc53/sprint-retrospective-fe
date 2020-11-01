import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {};
  return (
    <div className="d-flex justify-content-center">
      <Card className="login-form">
        <Card.Title className="mt-4">Login</Card.Title>
        <Card.Body>
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
  );
};
const Login = withRouter(LoginPage);
export default Login;
