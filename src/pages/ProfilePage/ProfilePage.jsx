import { useState } from "react";
import * as usersAPI from "../../utilities/users-api";
import Heatmap from "../../components/Heatmap/Heatmap";
import "./ProfilePage.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

const dt = new Date();
const todayDays = dt.getDate();
const month = dt.getMonth() + 1; //months are 0 based
const year = dt.getFullYear();
const daysInMonth = new Date(year, month, 0).getDate();
console.log(daysInMonth);
console.log("today: " + todayDays);
const now = Math.floor(todayDays / daysInMonth) * 100;

export default function ProfilePage({ user }) {
  const [subscribe, setSubscribe] = useState(user.subscribe);

  async function handleClick() {
    setSubscribe(!subscribe);
    user.subscribe = !subscribe;
    console.log("profile page: ", user);
    await usersAPI.subscribeOrNot(user);
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">GREAT JOB!</h1>
      <ProgressBar now={now} label={`${now}%`} />

      {/* d3 chart */}

      <Heatmap />

      {/* User statistics */}
      {/*
      <div className="user-stats">
        <p>You have been checking in </p>
        <p>xxx for xx times!</p>
        <p>xxx for xx times!</p>
      </div> */}

      {/* user is opt in email subscriber? */}
      <Card className="subscribe" style={{ width: "40rem" }}>
        {subscribe ? (
          <Card.Body>
            <Card.Text>
              You will receive a checking email from us to {user.email} every
              morning at 7am! ☀️
            </Card.Text>
            <Card.Text>Click the button below to opt out.</Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>Sorry to see you go!</Card.Title>
            <Card.Text>
              Resubscribe and restart habits tracking journey!☀️
            </Card.Text>
            <Card.Text>Click the button below to subscribe! 🙌</Card.Text>
          </Card.Body>
        )}

        {subscribe ? (
          <Button variant="secondary" onClick={handleClick}>
            unsubscribe
          </Button>
        ) : (
          <Button variant="primary" onClick={handleClick}>
            subscribe
          </Button>
        )}
        {/* <Button variant="secondary" onClick={handleClick}>
          {subscribe ? "unsubscribe" : "subscribe"}
        </Button> */}
      </Card>
    </div>
  );
}
