//already arrenged the file with correct path
import { createSlice } from "@reduxjs/toolkit";
import {
  getAnecdotes,
  createAnecdote,
  upVoteAnecdote,
} from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },

    newAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const notes = await getAnecdotes();
    dispatch(setAnecdotes(notes));
  };
};

export const addAnecdotes = (anecdotetoAdd) => {
  return async (dispatch) => {
    const addedAnecdotes = await createAnecdote(anecdotetoAdd);
    dispatch(newAnecdote(addedAnecdotes));
  };
};

export const upVote = (anecdoteToUpdate) => {
  return async (dispatch) => {
    const response = await upVoteAnecdote(anecdoteToUpdate);
    dispatch(voteAnecdote(response));
  };
};

export const { voteAnecdote, newAnecdote, setAnecdotes } =
  anecdoteReducer.actions;
export default anecdoteReducer.reducer;
