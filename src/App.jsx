import { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Cart from "./Cart.jsx";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const scroll = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div id="app_body">
        <div className="nav_bar">
          <div className="head">
            <Link
              to="/"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <p>dumpCart</p>
            </Link>
          </div>
          <div className="navs">
            <div className="navs_buts">
              <p
                onClick={() => {
                  if (pathname === "/cart") navigate("/");
                  else scroll("home_home");
                }}
              >
                Home
              </p>
              <p
                onClick={() => {
                  scroll("home_shop");
                }}
              >
                shop
              </p>
              <p>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "rgb(32, 32, 32)" }}
                >
                  cart
                </Link>
              </p>
              <p
                onClick={() => {
                  scroll("home_last");
                }}
              >
                contact
              </p>
            </div>
            <div className="home_login">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
