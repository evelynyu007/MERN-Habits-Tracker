import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import CalendarPage from "../CalendarPage/CalendarPage";
import HabitsPage from "../HabitsPage/HabitsPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Header />
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/calendar" />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      <Footer />
    </main>
  );
}
