const express = require('express');
const app = express();

const phonebookData = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (req, res) => {
  res.send("<h1>PhoneBook</h1>");
});

app.get('/api/persons', (req, res) => {
  res.json(phonebookData);
});

app.get('/info', (req, res) => {
  const requestTime = new Date();
  const numberOfEntries = phonebookData.length;

  const htmlResponse = `
    <p>PhoneBook has Info for ${numberOfEntries} people</p>
    <p>${requestTime}</p>
  `;

  res.send(htmlResponse);
});

app.get('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id);
  const person = phonebookData.find(entry => entry.id === personId);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
