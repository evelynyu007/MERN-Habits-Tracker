import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <h4 onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? (
          <span className="auth-span">Have an accout? Log In</span>
        ) : (
          <span className="auth-span">Dont' have an accout? Sign Up</span>
        )}
      </h4>
    </main>
  );
}
