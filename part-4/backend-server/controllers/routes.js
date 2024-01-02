const Blog = require("../models/note")
const app = require("express").Router()
app.get('/', (request, response,next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch(error => next(error))
  })
  
  app.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(error => next(error))
  })

  module.exports = app;