import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="auth-page-container">
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <h4 onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp
          ? "Have an accout? Log In"
          : "Dont' have an accout? Sign Up"}
      </h4>
    </main>
  );
}
