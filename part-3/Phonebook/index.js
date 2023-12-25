const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors")
app.use(express.json());
const mongoose = require('mongoose')


const url =
  `mongodb+srv://Phonebook:phonebook@phonebook.fclcj21.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)







app.use(cors())
app.use(express.static("dist"))

morgan.token('postData', (req, res) => JSON.stringify(req.body));

app.use(morgan('tiny'));



let phonebookData = [];



app.get('/api/persons', (req, res) => {
  Person.find({}).then((result)=> {
    res.json(result);
  })
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
  Person.findById(req.params.id).then(result => {
    if(result) {
      res.json(result)
    } else{
      res.status(404).send(`There are no notes at ${req.params.id}`)
    }
  }).catch((e)=>{
    next(e)
  })
});

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const nameExists = phonebookData.some(entry => entry.name === newPerson.name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  newPerson.id = Math.floor(Math.random() * 1000000) + 1;

  phonebookData = [...phonebookData, newPerson];
  res.json(newPerson);



  // const person = new Person({
  //   name: 'Try not to laugh',
  //   number: 666,
  // })
  
  // person.save().then(result => {
  //   console.log('note saved!')
  //   mongoose.connection.close()
  // })
});

app.delete('/api/persons/:id', (req, res) => {
  const myId = Number(req.params.id);
  phonebookData = phonebookData.filter(note => note.id !== myId);

  if (phonebookData) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
