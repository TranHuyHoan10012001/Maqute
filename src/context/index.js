import { createContext, useState } from "react";
const Context = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);

  const value = { user, setUser, questionsList, setQuestionsList };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
