import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "./Cart";
import { MyContext } from "./MyContext";
import "./CartComp.css";
import remove_item from "./assets/remove.svg";

function CartComp(props) {
  const { prod_det, setProd_det } = useContext(MyContext);
  const { total, setTotal } = useContext(CartContext);
  const [prod_count, setProd_count] = useState(1);
  return (
    <>
      <div className="cartcomp_body">
        <div className="prod_det">
          <div className="cart_prod_img">
            <img src={props.img} alt="prod_img" />
          </div>
          <div className="cart_prod_title">
            <p>{props.title}..</p>
          </div>
        </div>
        <div className="prod_quantity">
          <div className="prod_quant_but">
            <button
              id="prod_quant_minus"
              onClick={(e) => {
                if (prod_count > 1) {
                  setProd_count((prev) => prev - 1);
                  setTotal((prev) => prev - props.price);
                }
              }}
            >
              -
            </button>
            <p
              id="prod_quant_count"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {prod_count}
            </p>
            <button
              id="prod_quant_add"
              onClick={(e) => {
                setProd_count((prev) => prev + 1);
                setTotal((prev) => prev + props.price);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="prod_remove">
          <img
            src={remove_item}
            id="prod_rem_but"
            onClick={() => {
              // remove id from prod_det
              prod_det.splice(prod_det.indexOf(props.id), 1);
              props.fetchData();
              if (prod_det.length > 0) props.remove_item(props.id);
            }}
          />
        </div>
        <div className="cart_prod_price">
          <p>{props.price * prod_count}</p>
        </div>
      </div>
    </>
  );
}

export default CartComp;
