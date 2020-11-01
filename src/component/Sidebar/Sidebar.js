import React from "react";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "../HomeLayout/css/HomeLayout.css";

const Side = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">Sprint Retro</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/features">Features</Nav.Link>
          <Nav.Link href="/pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Link to="/login" className="btn btn-outline-primary ml-2">Login</Link>
      </Navbar>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
