import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  // Sort anecdotes by votes in descending order
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteAction(id));
  };

  return (
    <div>
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
    </div>
  );
};

export default AnecdoteList;
