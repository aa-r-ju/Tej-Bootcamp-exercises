const PersonForm = ({ addNote, newName, handleAddNote, newVal, handleNewVal }) => (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleAddNote} />
      </div>
      <div>
        number: <input value={newVal} onChange={handleNewVal} />
      </div>
  
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

  export default PersonForm;