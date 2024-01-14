import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import star from "./assets/star.svg";
import cart from "./assets/cart2.svg";
import { MyContext } from "./MyContext";
import { useContext } from "react";
import "./Comp.css";

function Comp(props) {
  const { prod_det, setProd_det, u_email, setU_email } = useContext(MyContext);
  const {
    id = "",
    title = "",
    price = 0,
    category = "",
    description = "",
    image = "",
    rating = {},
  } = props.details || {};
  const { rate, count } = rating || {};

  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr(
      Array.from({ length: Math.round(rate) }, (_, i) => (
        <img key={i} src={star} alt="*" style={{ height: "20px" }} />
      ))
    );
  }, []);

  const update_cart = () => {
    fetch("https://ecom-server-09j2.onrender.com/addcart", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ arr: prod_det, email: u_email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 1) toast.success("Item added!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} id="toast" />
      <div className="comp_cont">
        <img src={image} className="comp_img"></img>
        <div className="comp_detail">
          <h5>{title.slice(0, 30)}..</h5>
          <div
            className="comp_bot"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="detail_text" style={{ width: "50%" }}>
              <div className="comp_star">{arr}</div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "5px",
                }}
              >
                ${price}
                <span style={{ color: "rgb(7, 66, 138)" }}>{count}</span>
              </p>
            </div>
            <div
              id="shop_cart_but"
              onClick={() => {
                if (u_email !== "" && !prod_det.includes(id)) {
                  setProd_det((prev) => [...prev, id]);
                  update_cart();
                } else if (u_email === "") toast.error("Pls Login !");
              }}
            >
              <img src={cart} alt="+_cart" id="cart_img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comp;
