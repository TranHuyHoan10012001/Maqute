import axios from "../axios";

const handleAddKeyApi = (questionId, keyAnswer) => {
  return axios.post("/api/create-key", { questionId, keyAnswer });
};

const handleUpdateKeyApi = (questionId, key) => {
  return axios.patch("/api/update-question-key", { questionId, key });
};
export { handleAddKeyApi, handleUpdateKeyApi };
