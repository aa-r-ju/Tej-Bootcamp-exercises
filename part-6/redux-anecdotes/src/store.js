import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterreducer';

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools
});

export default store;
