import { useState } from "react";
import * as usersAPI from "../../utilities/users-api";
import Heatmap from "../../components/Heatmap/Heatmap";
import "./ProfilePage.css";

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
      {/* d3 chart */}

      <Heatmap />

      {/* User statistics */}
      <div className="user-stats">
        <p>You have been checking in </p>
        <p>xxx for xx times!</p>
        <p>xxx for xx times!</p>
      </div>

      {/* user is opt in email subscriber? */}
      <div className="subscribe">
        {subscribe ? (
          <section>
            <p>
              You will receive a checking email from us to {user.email} every
              morning at 7am! ☀️
            </p>
            <p>Click the button below to opt out.</p>
          </section>
        ) : (
          <section>
            <p>Sorry to see you go!</p>
            <p>Resubscribe and restart habits tracking journey!☀️</p>
            <p>Click the button below to subscribe! 🙌</p>
          </section>
        )}
        <button onClick={handleClick}>
          {subscribe ? "unsubscribe" : "subscribe"}
        </button>
      </div>
    </div>
  );
}
