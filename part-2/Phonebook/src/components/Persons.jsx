const Persons = ({ filteredPersons }) => (
    <ul>
      {filteredPersons.map((person, id) => (
        <li key={id}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );

  export default Persons