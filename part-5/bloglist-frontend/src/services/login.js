import axios from "axios";

const baseUrl = "http://localhost:3003/api/login";

const login = async (user) => {
  let loggedinUser = await axios.post(baseUrl, user);
  return loggedinUser.data;
};
export default { login };
