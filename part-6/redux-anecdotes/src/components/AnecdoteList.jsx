import { useSelector, useDispatch } from "react-redux";
import { upVoteAnecdote } from "../services/anecdotes";
import { notificationTimeout } from "../reducers/notificationReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: upVoteAnecdote,
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      );
    },
  });

  const vote = (anecdote) => {
    const { content } = anecdote;
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(anecdoteToUpdate);
    dispatch(notificationTimeout(`you voted '${content}'`, 1));
  };

  const ShowAnecdote = filters
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filters.toLowerCase())
      )
    : anecdotes;
  const sortedAnecdotes = [...ShowAnecdote];
  sortedAnecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
