import React, { createContext, useReducer } from "react";
import { reducer } from '../Context/reducer';

export const GlobalContext = createContext("Initial Value");


let data = {
  user: {},
  isLogin: null,
  darkTheme: true,
  cart: JSON.parse(localStorage.getItem("cartItem")) || [],
  baseUrl:
  window.location.href.indexOf("https") === -1
    ? "https://ecommrace-web-app.up.railway.app/"
    : "http://localhost:3001"
};  


export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}