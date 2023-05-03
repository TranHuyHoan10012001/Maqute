import { createContext, useState } from "react";
const Context = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [key, setKey] = useState([]);

  const value = { user, setUser, questionsList, setQuestionsList, key, setKey };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
