import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuthenticated: false,
  draft: null
});

export default Context;
