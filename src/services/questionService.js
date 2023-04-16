import axios from "../axios";

const handleQuestionAddApi = (content, subject, category, level) => {
  return axios.post("/api/create-question", {
    content,
    subject,
    category,
    level,
  });
};

const handleQuestionListApi = () => {
  return axios.get("/api/list-questions");
};

export { handleQuestionAddApi, handleQuestionListApi };
