import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector(state => state);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: 'VOTE', id });
  };

  const addAnecdote = (content) => {
    dispatch({ type: 'ADD_ANECDOTE', content });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        addAnecdote(content);
        e.target.anecdote.value = ''; // Clear the input after submitting
      }}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
