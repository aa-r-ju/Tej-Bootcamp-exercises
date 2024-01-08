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


app.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    if (result) {
      response.status(204).end();  
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});


app.put('/:id', async (request, response, next) => {
  const { likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true }  
    );

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});

  module.exports = app;

