import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useDispatch } from "react-redux";
import {
  resetNotification,
  setNotification,
} from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  let dispatch = useDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.concat(newAnecdote)
      );
    },
  });

  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    const anecdoteToAdd = { content, votes: 0 };
    newAnecdoteMutation.mutate(anecdoteToAdd);
    event.target.newAnecdote.value = "";
    dispatch(setNotification(`You created new anecdote ${content}`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
