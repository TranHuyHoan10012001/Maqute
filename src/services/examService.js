import axios from "../axios";

const handleGetExamByIdApi = (id) => {
  return axios.get(`/api/get-exam?id=${id}`);
};

const handleGetAllExamApi = () => {
  return axios.get("/api/list-exams");
};

export { handleGetExamByIdApi, handleGetAllExamApi };
