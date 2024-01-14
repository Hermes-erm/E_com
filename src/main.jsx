import React, { Children, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContProvider } from "./MyContext.jsx";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContProvider>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ContProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
