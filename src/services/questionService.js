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

const handleGetQuestionByIdApi = (id) => {
  return axios.get(`/api/get-question?id=${id}`);
};

const handleDeleteQuestionApi = (questionId) => {
  return axios.delete("/api/delete-question", { data: { id: questionId } });
};

export {
  handleQuestionAddApi,
  handleGetQuestionByIdApi,
  handleQuestionListApi,
  handleDeleteQuestionApi,
};
