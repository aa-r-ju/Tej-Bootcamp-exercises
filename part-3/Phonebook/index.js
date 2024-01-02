const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors")
app.use(express.json());
const mongoose = require('mongoose')
require("dotenv").config()

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength:3,
    required:true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2}-\d{7}$|^\d{3}-\d{8}$/ .test(v);
      },
    },
    required: [true, 'User phone number required']
  }
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
app.use(morgan('tiny'));


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



app.get('/api/persons', (req, res) => {
  Person.find({}).then((result)=> {
    res.json(result);
  })
});

app.get('/info', async (req, res) => {
  try {
    const count = await Person.countDocuments({});
    const requestTime = new Date();
    res.send(`
      <p>PhoneBook has Info for ${count} people</p>
      <p>${requestTime}</p>
    `);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/api/persons/:id', (req, res, next) => {
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

app.post('/api/persons', (req, res, next) => {
  const newPerson = req.body;

  if (newPerson.name === undefined || newPerson.number === undefined) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const person = new Person({
    name: newPerson.name,
    number:newPerson.number,
  })
  
  person.save().then(result => {
    res.json(result)
  }).catch(e => {
    console.log("from backend:", e)
    next(e)
  })
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(
    res.status(204).end()
).catch(error => next(error) )
});


app.put('/api/persons/:id', (req, res, next) => {
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number
  };

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true})
    .then(updated => {
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({error:error.message})
  }
  next(error)
}

app.use(errorHandler)



app.listen(process.env.PORT)
  console.log(`Server running on port ${process.env.PORT}`);
