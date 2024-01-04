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
  
  app.post('/', async (request, response,next) => {
    const blog = request.body

 const note = new Blog ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })

    try {
      const savedNote = await note.save()
        response.status(201).json(savedNote)
    } catch (error) {
      next(error); 
    }
 })

  module.exports = app;

