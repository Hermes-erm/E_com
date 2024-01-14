import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [c_pass, setCpass] = useState("");

  const press_enter = (e) => {
    validate(e);
  };

  const validate = (e) => {
    const data = {
      uname: "",
      email: "",
      pass: "",
    };
    let warText = document.getElementById("signup_warning");
    e.preventDefault();
    if (uname === "" || pass === "" || c_pass === "" || email === "") {
      warText.innerText = "- have to fill all the input fields -";
    } else if (pass != c_pass) {
      warText.innerText = "- password doesn't match -";
    } else {
      data.uname = uname;
      data.email = email;
      data.pass = pass;
      fetch("https://ecom-server-09j2.onrender.com/log", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === 0) {
            toast.success("signed up successfully!");
            setTimeout((e) => {
              navigate("/login");
            }, 1000);
          } else if (data === 1) {
            warText.innerText = "Email already exist!";
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <>
      <Toaster />
      <div className="signup_home">
        <div className="signup_cont">
          {/* <div className="signup_form_cont"> */}
          <form
            id="signup_form"
            onSubmit={(e) => {
              validate(e);
            }}
          >
            <h2>Sign Up</h2>
            <input
              type="text"
              id="signup_text_inp"
              placeholder="username"
              // onKeyDown={(e) => {
              //   press_enter(e);
              // }}
              onChange={(e) => {
                setUname(e.target.value);
              }}
            />
            <input
              type="email"
              id="signup_email_inp"
              placeholder="Email address"
              // onKeyDown={(e) => {
              //   press_enter(e);
              // }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              id="signup_pass_inp"
              placeholder="create password"
              // onKeyDown={(e) => {
              //   press_enter(e);
              // }}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <input
              type="text"
              id="signup_cpass_inp"
              placeholder="confirm password"
              // onKeyDown={(e) => {
              //   press_enter(e);
              // }}
              onChange={(e) => {
                setCpass(e.target.value);
              }}
            />
            <p id="signup_warning" style={{ color: "red" }}>
              --
            </p>
            <input
              type="submit"
              id="signup_sub_but"
              value="Create My Account"
            />
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Login here
              </Link>
            </p>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Signup;
