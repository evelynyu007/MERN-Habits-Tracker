import React from "react";
import { Link } from "react-router-dom";
import * as usersService from "../../utilities/users-service";

export default function NavBar(props) {
  function handleLogOut() {
    usersService.logOut();
    props.setUser(null);
  }

  return (
    <nav>
      <Link to="/calendar">Calendar</Link>
      &nbsp; | &nbsp;
      <Link to="/habits">Habits</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {props.user.name}</span>
      &nbsp; | &nbsp;
      <Link to="/checkin">Today's Check-In</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
