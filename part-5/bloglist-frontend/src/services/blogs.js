import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

const getAll = async (blogs) => {
  const response = await axios.get(baseUrl,blogs)
  return response.data;
}

export default { getAll }