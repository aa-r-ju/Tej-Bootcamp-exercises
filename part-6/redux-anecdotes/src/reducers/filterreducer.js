const initialState = '';  // Set initial state to an empty string

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const setFilterAction = (filter) => ({
  type: 'SET_FILTER',
  filter,
});

export default filterReducer;
