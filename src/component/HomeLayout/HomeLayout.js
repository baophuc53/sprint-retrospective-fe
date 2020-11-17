import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Route, useRouteMatch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import "./css/HomeLayout.css";
import LoginPage from '../LoginPage/LoginPage';

const HomeLayout = (props) => {
  //let match = useRouteMatch();
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Table  bordered hover>
              <thead>
                <tr>
                  <th className="title">Menu</th>
                </tr>
              </thead>
              <tbody>
                <tr><th><Link to="/info">Change Info</Link></th></tr>
                <tr><th><Link to="/change-pass">Change Password</Link></th></tr>
              </tbody>
            </Table>
          </Col>
          <Col xl={10} id="page-content-wrapper">
            <HomePage />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default withRouter(HomeLayout);
