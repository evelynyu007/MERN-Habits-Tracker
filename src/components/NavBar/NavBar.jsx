import React from "react";
//import { Link } from "react-router-dom";
import * as usersService from "../../utilities/users-service";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

export default function NavBar(props) {
  function handleLogOut() {
    usersService.logOut();
    props.setUser(null);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Navbar.Brand>
        {/* <img src={icons8-scroll-64} /> */}
        Routines Tracker
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="container-fluid">
          <Nav.Link href="/profile">
            <span>Hi, {props.user.name}</span>
          </Nav.Link>

          <Nav.Link href="/checkin">
            <span> Today's Check-In </span>
          </Nav.Link>

          <Nav.Link href="/calendar">
            <span> Calendar</span>
          </Nav.Link>

          <Nav.Link href="/habits">
            <span> Routines</span>
          </Nav.Link>

          <Nav.Item className="ms-auto">
            <Nav.Link href="" onClick={handleLogOut}>
              <span id="log-out">Log Out</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
