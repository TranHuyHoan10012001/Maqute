import axios from "../axios";

const handleUserLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const handleUserRegisterApi = (email, password, firstName, lastName) => {
  return axios.post("/api/create-user", {
    email,
    password,
    firstName,
    lastName,
  });
};
export { handleUserLoginApi, handleUserRegisterApi };
