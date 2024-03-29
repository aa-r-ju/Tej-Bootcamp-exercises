import axios from "axios";
const baseUrl = "/api/blogs";

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
  setToken(); 
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
  setToken(); 
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
  console.log(id,"id from backend")
  setToken(); 
  console.log("Token:", token); 
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    console.log(response,"response")
    return response;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};


export default { getAll, create, setToken, update, deleteBlog };
