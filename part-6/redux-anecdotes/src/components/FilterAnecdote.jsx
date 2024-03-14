import { useDispatch } from "react-redux";
import { anecdoteFilterForm } from "../reducers/filterReducer";

const FilterAnecdote = () => {
  const dispatch = useDispatch();
  const filterAnecdotes = (event) => {
    dispatch(anecdoteFilterForm(event.target.value));
  };
  return (
    <>
      filter{" "}
      <input type="text" name="inputToFilter" onChange={filterAnecdotes} />
    </>
  );
};

export default FilterAnecdote;
