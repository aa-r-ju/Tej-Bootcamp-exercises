// AnecdoteForm.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer'; // Fix import name

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (content) => {
    dispatch(addAnecdote(content));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addNewAnecdote(content);
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
