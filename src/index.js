import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App/App";
/// client side route - nothing to do with backend
/// import router in index.js - to avoid reclaim it again - Anything in App can use router
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
