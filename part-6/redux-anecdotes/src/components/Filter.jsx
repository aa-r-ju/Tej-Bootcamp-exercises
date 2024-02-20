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


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterAction } from '../reducers/filterreducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => String(state.filter) || '');
  console.log(filter,"aarju")

  const handleChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilterAction(newFilter));
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





