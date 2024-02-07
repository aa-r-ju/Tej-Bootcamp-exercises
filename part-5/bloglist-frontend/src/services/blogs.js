import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = () => {
  const userToken = JSON.parse(window.localStorage.getItem("user"));
  token = `Bearer ${userToken.token}`;
};

const getAll = async (blogs) => {
  const response = await axios.get(baseUrl, blogs);
  return response.data;
};

const create = async (newblogs) => {
  setToken(); // Set token before making the request
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newblogs, config);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
  }
};

const update = async (id, blogToUpdate) => {
  setToken(); // Set token before making the request
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config);
    console.log(response.data, "from update service");
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};

const deleteBlog = async (id) => {
  setToken(); // Set token before making the request
  console.log("Token:", token); // Check if the token is set correctly
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response;
  } catch (error) {
    console.error("Error deleting blog:", error);
    // You might want to rethrow or handle the error here
    throw error;
  }
};


export default { getAll, create, setToken, update, deleteBlog };
