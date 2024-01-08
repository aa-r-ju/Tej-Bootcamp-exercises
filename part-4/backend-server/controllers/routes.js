const Blog = require("../models/note")
const app = require("express").Router()
app.get('/', async (request, response, next) => {
  try {
    let result = await Blog.find({});
    response.json(result);
  } catch (error) {
    next(error); 
  }
});

app.get('/:id', (request, response,next) => {
  Blog.findById(request.params.id).then(result => {
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
  const blog = new Blog(request.body);
  if (!blog.title || !blog.url) {
    response.status(400).json({error: "missing property"}).end();
  }
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

  module.exports = app;

