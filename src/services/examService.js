import axios from "../axios";

const handleGetExamByIdApi = (id) => {
  return axios.get(`/api/get-exam?id=${id}`);
};

export default handleGetExamByIdApi;
