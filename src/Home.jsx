import React from "react";
import { useState, useEffect } from "react";
import Comp from "./Comp.jsx";
import { Link } from "react-router-dom";
import left_arr from "./assets/left_arr.svg";
import right_arr from "./assets/right_arr.svg";
import facebook from "./assets/facebook.svg";
import insta from "./assets/insta.svg";
import twitter from "./assets/twitter.svg";
import linked_in from "./assets/linked_in.svg";
import "./App.css";

function Home() {
  const [st, setSt] = useState(0);
  const [end, setEnd] = useState(8);
  const [prod, setProd] = useState([]);
  const scroll = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };
  useEffect((e) => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProd(data);
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <>
      <div id="home_home">
        <div className="home_cont">
          <div className="cont_text">
            <p>Trade-in-offer</p>
            <div className="highlight">
              <h2>Super value deals</h2>
              <h3>On all products</h3>
            </div>
            <p>Save more with coupens & up to 70% off !</p>
          </div>
          <button
            className="home_shop_but"
            onClick={() => {
              scroll("home_shop");
            }}
          >
            shop now
          </button>
        </div>
      </div>
      <div id="home_shop">
        <img
          src={left_arr}
          className="slider_buts"
          onClick={() => {
            if (st >= 8 && end <= 20) {
              setSt((prev) => prev - 8);
              end == 20
                ? setEnd((prev) => prev - 4)
                : setEnd((prev) => prev - 8);
            }

            document.getElementById("shop_slide_offer").style.display = "none";
          }}
        />
        <div className="home_shop_slide">
          <div className="shop_slide_wrap">
            <div className="shop_cont">
              {prod.map((ele, ind, arr) => {
                if (ind >= st && ind < end)
                  return <Comp key={ind} details={ele} />;
              })}
            </div>
            <div id="shop_slide_offer">
              <div className="slide_offer_cont">
                <div className="offer_cont_head">
                  <h3>PAYDAY SALE NOW</h3>
                </div>
                <div className="offer_cont_terms">
                  <p style={{ fontWeight: "bold" }}>1 Jan - 10 Feb 2024</p>
                  <p>*Terms & Conditions apply</p>
                </div>
                <button id="offer_cont_but">SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
        <img
          src={right_arr}
          className="slider_buts"
          onClick={() => {
            if (st >= 0 && end < 20) {
              setSt((prev) => prev + 8);
              end == 16
                ? setEnd((prev) => prev + 4)
                : setEnd((prev) => prev + 8);
            }
            if (st >= 8 && end >= 16) {
              document.getElementById("shop_slide_offer").style.display =
                "block";
            }
          }}
        />
      </div>
      <div id="home_last">
        <div className="home_last_top">
          <div className="last_top_cont">
            <div className="top_cont_head">
              <h2>JOIN SHOPPING COMMUNITY </h2>
              <h2>TO GET MONTHLY PROMO</h2>
            </div>
            <p>Type your email down below and be young wild generation</p>
            <div className="top_cont_inp">
              <input type="email" placeholder="Add your email here" />
              <button>Send</button>
            </div>
          </div>
        </div>
        <div className="home_last_bottom">
          <div className="bottom_left">
            <div className="bot_left_cont">
              <h2>FASHION</h2>
              <div>
                <p>complete your style with awesome </p>
                <p>clothes from us.</p>
              </div>
              <div className="bot_left_buts">
                <img src={facebook} />
                <img src={insta} />
                <img src={twitter} />
                <img src={linked_in} />
              </div>
            </div>
          </div>
          <div className="bottom_right">
            <div className="bot_right_cont">
              <div className="last_company">
                <ul>
                  <h2>Company</h2>
                  <li>About</li>
                  <li>Contact us</li>
                  <li>Support</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div className="last_quicklink">
                <ul>
                  <h2>Quick Link</h2>
                  <li>Share location</li>
                  <li>Orders Tracking</li>
                  <li>Size Guide</li>
                  <li>FAQs</li>
                </ul>
              </div>
              <div className="last_legal">
                <ul>
                  <h2>Legal</h2>
                  <li>Terms & conditions</li>
                  <li>Privacy Policy</li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
