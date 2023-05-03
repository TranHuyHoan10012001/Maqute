import axios from "../axios";

const handleGetExamByIdApi = (id) => {
  return axios.get(`/api/get-exam?id=${id}`);
};

const handleGetAllExamApi = () => {
  return axios.get("/api/list-exams");
};

const handleCreateExamApi = (
  subject,
  category,
  questions,
  timeLimit,
  maxScore,
  file
) => {
  return axios.post("/api/create-exam", {
    subject,
    category,
    questions,
    timeLimit,
    maxScore,
    file,
  });
};

export { handleGetExamByIdApi, handleGetAllExamApi, handleCreateExamApi };
