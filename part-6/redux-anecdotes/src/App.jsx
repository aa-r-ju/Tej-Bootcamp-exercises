import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification";
import { getAnecdotes } from "./services/anecdotes";
import { initializeAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAnecdotes().then((notes) => dispatch(initializeAnecdote(notes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
