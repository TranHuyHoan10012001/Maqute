import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import routes from "./route/app-route";
import { Login } from "./component/login";
import { Resgister } from "./component/main/component/register";
import "antd/dist/antd.min.css";
import ExamManagementComponent from "./component/main/component/exam-management";
import QuestionManagementComponent from "./component/main/component/question-management";
import QuestionDetail from "./component/main/component/question-management/question-detail";
import { Main } from "./component/main";
import { AddQuestion } from "./component/main/component/question-management/add-question/AddQuestion";
import HomeComponent from "./component/home";
import { ExamDetailWrapper } from "./component/main/component/exam-management/exam-detail/ExamDetailWrapper";
import ForgotPassword from "./component/login/forgot-password";
import { ChangePassword } from "./component/login/change-password";
import { ExamAnalyst } from "./component/main/component/exam-management/exam-analyst";
// import { ExamDetail } from "./component/main/component/exam-management/exam-detail/ExamDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Resgister />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/changePassword" element={<ChangePassword />} />
        <Route exact path="/" element={<Main />}>
          <Route path="/" element={<HomeComponent />} />
          <Route
            path="/question-management"
            element={<QuestionManagementComponent />}
          />
          <Route
            path="/question-management/detail/:id"
            element={<QuestionDetail />}
          />
          <Route
            path="/question-management/type-question"
            element={<AddQuestion />}
          />

          <Route
            path="/exam-management"
            element={<ExamManagementComponent />}
          />
          <Route path="/exam-detail/:id" element={<ExamDetailWrapper />} />
          <Route path="/exam-analyst/:id" element={<ExamAnalyst />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
