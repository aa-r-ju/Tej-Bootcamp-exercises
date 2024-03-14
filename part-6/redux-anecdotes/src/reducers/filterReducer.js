const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER-ANECDOTE": {
      return action.payload;
    }

    default:
      return state;
  }
};

export const anecdoteFilterFrom = (searchTerm) => {
  return {
    type: "FILTER-ANECDOTE",
    payload: searchTerm,
  };
};

export default filterReducer;
