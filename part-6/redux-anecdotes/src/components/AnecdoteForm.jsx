import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdoteAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (content) => {
    dispatch(addAnecdoteAction(content));
  };

  const vote = (id) => {
    dispatch(voteAction(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote(content);
    e.target.anecdote.value = ''; // Clear the input after submitting
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
