import { useState } from "react";

export default function ProfilePage({ user }) {
  const [subscribe, setSubscribe] = useState(true);

  async function handleClick() {
    setSubscribe(!subscribe);
  }

  return (
    <div className="profile-page">
      <p>GREAT JOB!</p>

      <div className="user-stats">
        <p>Stats:</p>
      </div>

      {/* user is opt in email subscriber? */}
      {subscribe ? (
        <section>
          <p>
            You will receive a checking email from us to {user.email} every
            morning at 7am! ☀️
          </p>
          <p>Click the button below to opt out!</p>
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
  );
}
