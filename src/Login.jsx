import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import "./Login.css";

function Login() {
  const { prod_det, setProd_det, u_email, setU_email } = useContext(MyContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const press_enter = (e) => {
    if (e.key === "Enter") validate(e);
  };

  const validate = (e) => {
    e.preventDefault();
    let warnText = document.getElementById("login_warn");
    if (pass === "") {
      warnText.innerText = " Enter your password bro ";
    } else {
      fetch("https://ecom-server-09j2.onrender.com/check", {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          pass: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // {id: 1, uname: 'panda', email: 'panda123@gmail.com', pass: '123', prod_id: '5,11,15,18'}
          if (data === 0) {
            warnText.innerText = " There's no such email ";
          } else if (data === 101) {
            warnText.innerText = " wrong password ";
          } else {
            setU_email(data.email);
            if (JSON.parse(data.prod_id).length > 0)
              setProd_det(JSON.parse(data.prod_id));
            else setProd_det([]);
            toast.success("Login succeed!");
            setTimeout(() => {
              navigate("/cart");
            }, 1000);
          }
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      <div id="login_body">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="login_cont">
          <div className="login_head">
            <h2>Log in</h2>
          </div>
          <div className="login_form_cont">
            <form
              id="login_form"
              onSubmit={(e) => {
                validate(e);
              }}
            >
              <input
                type="email"
                placeholder="Enter you Email.."
                id="login_email"
                onKeyDown={(e) => {
                  press_enter(e);
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="password"
                id="login_pass"
                onKeyDown={(e) => {
                  press_enter(e);
                }}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <div className="pass_check">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="login_pass_check"
                  onChange={(e) => {
                    if (e.target.checked === true)
                      document.getElementById("login_pass").type = "password";
                    else document.getElementById("login_pass").type = "text";
                  }}
                />
                <p>Hide password</p>
              </div>
              <p style={{ color: "red", fontSize: "small" }} id="login_warn">
                --
              </p>
              <input type="submit" value="Log in" id="login_but" />
              <p>----- New? sign up here -----</p>
            </form>
          </div>
          <Link
            to="/signup"
            id="login_sign_but"
            style={{ textDecoration: "none" }}
          >
            <input type="button" value="Sign up" id="login_sign_but_inp" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
