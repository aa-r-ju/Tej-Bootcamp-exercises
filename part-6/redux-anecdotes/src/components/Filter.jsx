// const Filter = () => {
//     const handleChange = (event) => {
//       // input-field value is in variable event.target.value
//     }
//     const style = {
//       marginBottom: 10
//     }
  
//     return (
//       <div style={style}>
//         filter <input onChange={handleChange} />
//       </div>
//     )
//   }
  
//   export default Filter


// Filter.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter || ''); // Removed unnecessary String conversion

  const handleChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;






