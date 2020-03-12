import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuthenticated: false
});

export default Context;
