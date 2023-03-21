import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import routes from "./route/app-route";
import { Login } from "./component/login";
import { Resgister } from "./component/register";
import 'antd/dist/antd.min.css';
import ExamManagementComponent from "./component/exam-management";
import QuestionManagementComponent from "./component/question-management";
import { Main } from "./component/main";
import HomeComponent from "./component/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Resgister />} />
        <Route exact path="/" element={<Main />}>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/question-management" element={<QuestionManagementComponent />} />
            <Route path="/exam-management" element={<ExamManagementComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
