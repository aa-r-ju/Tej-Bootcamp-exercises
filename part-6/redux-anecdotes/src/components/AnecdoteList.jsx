// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { voteAction } from '../reducers/anecdoteReducer';

// const AnecdoteList = () => {
//   const anecdotes = useSelector(state => state.anecdote);
//   const filters = useSelector(state=>state.filter)
//   const dispatch = useDispatch();

//   // Sort anecdotes by votes in descending order
//   // const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

//   const vote = (id) => {
//     dispatch(voteAction(id));
//   };
//   const ShowAnecdote = filters
//   ? anecdotes.filter((anecdote) =>
//       anecdote.content.toLowerCase().includes(filters.toLowerCase())
//     )
//   : anecdotes;

// ShowAnecdote.sort((a, b) => b.votes - a.votes);

//   return (
//     <div>
//         {ShowAnecdote.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => vote(anecdote.id)}>vote</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnecdoteList;





// AnecdoteList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer'; // Fix import name

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes); // Updated state name
  const filters = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const voteAnecdote = (id) => {
    dispatch(vote({ id })); // Updated the action call
  };

  const showAnecdotes = filters
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filters.toLowerCase())
      )
    : anecdotes;

  showAnecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {showAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
