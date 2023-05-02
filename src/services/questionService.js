import axios from "../axios";

const handleQuestionAddApi = (
  content,
  key,
  subject,
  category,
  level,
  author
) => {
  return axios.post("/api/create-question", {
    content,
    key,
    subject,
    category,
    level,
    author,
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
