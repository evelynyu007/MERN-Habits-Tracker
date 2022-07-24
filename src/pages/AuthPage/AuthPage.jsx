import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>Habits Tracker</h1>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <h3 onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp
          ? "Have an accout? Log In"
          : "Dont' have an accout? Sign Up"}
      </h3>
    </main>
  );
}
