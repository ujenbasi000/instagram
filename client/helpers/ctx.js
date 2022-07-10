import { createContext } from "react";
import values from "./ctxValues";

export const ctx = createContext();

const Context = ({ children }) => (
  <ctx.Provider value={values()}>{children}</ctx.Provider>
);

export default Context;
