import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { Link } from "react-router-dom";
import CartComp from "./CartComp.jsx";
import { MyContext } from "./MyContext.jsx";
import "./Cart.css";

export const CartContext = createContext();

function Cart() {
  const { prod_det, setProd_det, u_email } = useContext(MyContext);
  const [prod_data, setProd_data] = useState([]);
  const [total, setTotal] = useState(0);
  const [showAfterPlace, setShowAfterPlace] = useState(false);
  const [showBlur, setShowblur] = useState(false);

  useEffect(() => {
    fetchData();
  }, [prod_det]);

  const remove_item = (item_id) => {
    // toast.success("Item removed!");

    fetch("https://ecom-server-09j2.onrender.com/remove", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ arr: prod_det, email: u_email }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        const promises = JSON.parse(data.prod_id).map(async (ele) => {
          try {
            const response = await fetch(
              `https://fakestoreapi.com/products/${ele}`
            );
            const data = await response.json();
            setTotal((prev) => prev + Math.round(data.price));
            return {
              id: data.id,
              img: data.image,
              title: data.title.slice(0, 16),
              price: Math.round(data.price),
            };
          } catch (error) {
            console.error(error);
          }
        });
        const results = await Promise.all(promises);
        const validResults = results.filter((result) => result !== null);
        setProd_data(validResults);
      })
      .catch((err) => console.error(err));
  };

  const fetchData = async () => {
    const promises = prod_det.map(async (ele) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${ele}`
        );
        const data = await response.json();
        setTotal((prev) => prev + Math.round(data.price));
        return {
          id: data.id,
          img: data.image,
          title: data.title.slice(0, 16),
          price: Math.round(data.price),
        };
      } catch (error) {
        console.error(error);
      }
    });
    const results = await Promise.all(promises);
    const validResults = results.filter((result) => result !== null);
    setProd_data(validResults);
  };

  return (
    <CartContext.Provider value={{ total, setTotal }}>
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div id="cart_home">
        <div className="cart_cont">
          <div className="cart_desc">
            <div className="cart_desc_cont">
              <p className="cart_desc-1">Description</p>
              <p className="cart_desc-2">Quantity</p>
              <p className="cart_desc-3">Remove</p>
              <p className="cart_desc-4">Price</p>
            </div>
          </div>
          {showAfterPlace && prod_data.length > 0 && (
            <div
              id="after_place"
              style={{
                display: "flex",
              }}
            >
              Your order has been placed!
            </div>
          )}
          {prod_data.length === 0 && (
            <div className="cart_span">
              Cart is empty.. please{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "rgb(43, 255, 167)",
                }}
              >
                sign in
              </Link>{" "}
              to continue
              <br />
              <br />
              Already a user, go and{" "}
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "rgb(43, 255, 167)",
                }}
              >
                shop now
              </Link>{" "}
            </div>
          )}
          <div
            className="cart_prod_denom"
            style={{
              filter:
                showBlur && prod_data.length > 0 ? "blur(5px)" : "blur(0px)",
            }}
          >
            {prod_data.map((ele, ind, arr) => {
              return (
                <CartComp
                  key={ind}
                  id={ele.id}
                  img={ele.img}
                  title={ele.title}
                  price={ele.price}
                  fetchData={fetchData}
                  remove_item={remove_item}
                />
              );
            })}
          </div>
          <div className="cart_total">
            <div className="cart_bot_cont">
              <div className="cart_delivery">
                <p>Delivery - ${prod_det.length}.00</p>
              </div>
              <div className="cart_sub_tot">
                <p>Sub Total - ${total}.00</p>
              </div>
              <div className="cart_bot_total">
                <p>Total - ${total + prod_det.length}.00</p>
              </div>
              <div className="cart_place_order">
                <button
                  id="place_order"
                  onClick={() => {
                    setShowAfterPlace(true);
                    setShowblur(true);
                    setTimeout(() => {
                      setShowAfterPlace(false);
                      setShowblur(false);
                    }, 3000);
                  }}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default Cart;
