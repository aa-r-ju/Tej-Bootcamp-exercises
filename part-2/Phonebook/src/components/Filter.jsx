const Filter = ({ handleSearch }) => ( 
    <div>
      Filter shown with: <input type='search' onChange={handleSearch} />
    </div>
  );
  export default Filter;