import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = () => {
  const userToken = JSON.parse(window.localStorage.getItem("user"))
  token = `Bearer ${userToken.token}`
  return token
}

const getAll = async (blogs) => {
  const response = await axios.get(baseUrl,blogs)
  return response.data;
}

const create = async (newblogs) => {
  const myToken=setToken()
  const config = {
    headers: { Authorization: myToken },
  }
  const response = await axios.post(baseUrl, newblogs, config)
  return response.data;
}

export default { getAll, create, setToken}