import React, { useState } from "react";
import { createContext } from "react";

export const MyContext = createContext();

export const ContProvider = ({ children }) => {
  const [prod_det, setProd_det] = useState([]);
  const [u_email, setU_email] = useState("");
  return (
    <MyContext.Provider value={{ prod_det, setProd_det, u_email, setU_email }}>
      {children}
    </MyContext.Provider>
  );
};
