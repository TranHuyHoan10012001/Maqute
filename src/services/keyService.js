import axios from "../axios";

const handleAddKeyApi = (questionId, key) => {
  return axios.post("/api/create-key", { questionId, key });
};

const handleUpdateKeyApi = (questionId, key) => {
  return axios.patch("/api/update-question-key", { questionId, key });
};
export { handleAddKeyApi, handleUpdateKeyApi };
