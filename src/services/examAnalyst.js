import axios from "../axios";

const handleCreateAnalystApi = (
  examId,
  highGrade,
  commonGrade,
  lowGrade,
  comments
) => {
  return axios.post("/api/create-exam-analyst", {
    examId,
    highGrade,
    commonGrade,
    lowGrade,
    comments,
  });
};

const hanldeGetAnalystByIdApi = (examId) => {
  return axios.get(`api/get-analyst-by-id?examId=${examId}`);
};

export { handleCreateAnalystApi, hanldeGetAnalystByIdApi };
