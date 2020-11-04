import React from "react";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "../HomeLayout/css/HomeLayout.css";

const Side = (props) => {
  const id = localStorage.getItem("id");
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/home">Sprint Retro</Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/home">Home</Link>
          </Nav.Link>
          <Nav.Link>Features</Nav.Link>
          <Nav.Link>Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        {id ? (
          <Link onClick={logOut} className="btn btn-outline-primary ml-2">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary ml-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-success ml-2">
              Register
            </Link>
          </>
        )}
      </Navbar>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
