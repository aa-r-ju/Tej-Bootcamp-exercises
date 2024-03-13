import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdote = async (anecdoteContent) => {
  const response = await axios.post(baseUrl, anecdoteContent);
  return response.data;
};

export const upVoteAnecdote = async (anecdoteToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${anecdoteToUpdate.id}`,
    anecdoteToUpdate
  );
  return response.data;
};
