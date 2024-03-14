import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.status === "error") {
    return <div>anecdotes service is not available due to server problem</div>;
  }

  const anecdotes = result.data;

  dispatch(setAnecdotes(anecdotes));
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
