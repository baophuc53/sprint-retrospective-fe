import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import config from "../../config/config.json";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Axios from "axios";
import "./css/LoginPage.css";

const LoginPage = (props) => {
  //console.log(props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongLogin, setIsWrongLogin] = useState(false);
  const token = localStorage.getItem("token");
  Axios.defaults.withCredentials = true;
  const onLogin = () => {
    Axios.post(`${config.dev.path}/user`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          window.location.href = "/home";
        } else setIsWrongLogin(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    const entity = {
      id: response.googleId,
      username: response.profileObj.email,
      name: response.profileObj.name,
      token: response.accessToken
    }
    if (entity) {
    Axios.post(`${config.dev.path}/user/other`, entity)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("isGoogle", true);
          window.location.href = "/home";
        } else setIsWrongLogin(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
    }
  };
  const responseFacebook = (response) => {
    console.log(response);
    const entity = {
      id: response.id,
      username: response.name,
      name: response.name,
      token: response.accessToken
    }
    if (entity) {
    Axios.post(`${config.dev.path}/user/other`, entity)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("isFacebook", true);
          window.location.href = "/home";
        } else setIsWrongLogin(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
    }
  };
  return (
    <>
      {!token ? (
        <>
          <div className="layout">
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
                  {isWrongLogin ? (
                    <div className="alert">Wrong username or password!</div>
                  ) : (
                    <></>
                  )}
                  <Button onClick={onLogin}>Login</Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="other-login">
              <GoogleLogin
                clientId="508707946697-k8c21bn4nqubgbnkenv0ffd0fgfaiad1.apps.googleusercontent.com"
                buttonText="Login with Google"
                className="login-gg"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId="393121951807395"
                autoLoad={false}
                fields="name,email,picture"
                cssClass="login-fb"
                icon="fa-facebook fa-2x"
                callback={responseFacebook}
              />
            </div>
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
