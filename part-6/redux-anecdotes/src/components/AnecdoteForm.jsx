import { useDispatch } from "react-redux";
import { addAnecdotes } from "../reducers/anecdoteReducer";
import {
  resetNotification,
  setNotification,
} from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    const anecdoteToAdd = { content, votes: 0 };
    dispatch(addAnecdotes(anecdoteToAdd));
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
