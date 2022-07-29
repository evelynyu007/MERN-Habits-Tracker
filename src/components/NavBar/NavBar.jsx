import React from "react";
import { Link } from "react-router-dom";
import * as usersService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar(props) {
  function handleLogOut() {
    usersService.logOut();
    props.setUser(null);
  }

  return (
    <nav>
      <Link to="" onClick={handleLogOut}>
        <span id="log-out">Log Out</span>
      </Link>

      <Link to="/calendar">
        <span> Calendar</span>
      </Link>

      <Link to="/habits">
        <span> Habits</span>
      </Link>

      <Link to="/checkin">
        <span> Today's Check-In </span>
      </Link>
      <span>Welcome, {props.user.name}</span>
    </nav>
  );
}
