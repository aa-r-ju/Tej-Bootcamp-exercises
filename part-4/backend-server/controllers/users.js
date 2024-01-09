const User = require("../models/user")
const app = require("express").Router()
const bcrypt = require("bcrypt")
app.get('/', async (request, response, next) => {
  try {
    let result = await User.find({});
    response.json(result);
  } catch (error) {
    next(error); 
  }
});

app.get('/:id', (request, response,next) => {
  User.findById(request.params.id).then(result => {
      if (result) {
          response.send(result);
      } else {
          response.status(404).send({error: `${request.params.id} not found`})
      }
  }).catch(error => {
      next(error)
  })
})
  
app.post('/', async(request, response, next) => {
  const body = request.body;

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
   username:body.username,
   passwordHash,
   user:body.user,
  })

  try {
    const result = await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


  module.exports = app;

