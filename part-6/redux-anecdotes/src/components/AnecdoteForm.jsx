import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";

import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, contextDispatch] = useContext(NotificationContext);

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
    if (content.length > 5) {
      const anecdoteToAdd = { content, votes: 0 };
      newAnecdoteMutation.mutate(anecdoteToAdd);
      event.target.newAnecdote.value = "";
      contextDispatch({
        type: "SET_NOTIFICATION",
        payload: `anecdote '${content}' is added`,
      });
      setTimeout(() => {
        contextDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 2000);
    } else {
      contextDispatch({
        type: "SET_NOTIFICATION",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        contextDispatch({
          type: "RESET_NOTIFICATION",
        });
      }, 5000);
    }
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
