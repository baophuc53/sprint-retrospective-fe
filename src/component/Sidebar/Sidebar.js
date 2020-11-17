import React from "react";
import { Navbar } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "../Sidebar/css/Sidebar.scss";

const Side = (props) => {
  const token = localStorage.getItem("token");
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="brand">
          <Link to="/home">Sprint Retro</Link>
        </Navbar.Brand>
        {token ? (
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
