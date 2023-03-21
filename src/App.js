import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import routes from "./route/app-route";
import { Home } from "./component/Home";
import { Login } from "./component/Login";
import { Resgister } from "./component/Resgister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Resgister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
