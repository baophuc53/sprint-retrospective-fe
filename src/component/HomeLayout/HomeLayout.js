import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { withRouter } from "react-router";
import HomePage from "../HomePage/HomePage";
import "./css/HomeLayout.css";

const HomeLayout = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Card className="menu">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                  aaaaa
              </Card.Body>
            </Card>
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <HomePage />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomeLayout;
