import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom"; ///???

import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState(null); ///null is false {} is true

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar />
          <Routes>
            {/* Route compenents in here - use element that we can pass props too */}
            {/* after index.js runs, during this inital rendering, the client-side routing library renders components based upon the path of the URL */}
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
