import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  resetNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    console.log(content, "test");
    dispatch(newAnecdote(content));
    event.target.newAnecdote.value = "";
    dispatch(setNotification(`You added new anecdote '${content}'`));
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
