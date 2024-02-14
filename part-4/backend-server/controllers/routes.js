const Blog = require("../models/note")
const app = require("express").Router()
const User = require("../models/user")
const {info }= require("../utils/logger")
const jwt = require('jsonwebtoken');
const { tokenExtractor,userExtractor } = require("../utils/middleware");
app.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate("user",{username:1, name: 1})
   response.json(blogs)
})
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

app.post('/', tokenExtractor, async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const bloguser = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: decodedToken.id,
    });

    const result = await blog.save();
    bloguser.Blog = bloguser.Blog.concat(result._id);
    await bloguser.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});



app.delete('/:id', tokenExtractor, userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).send("Blog not found");
    }
    // info(user, blog.user);
    
    // Ensure blog.user exists before accessing its properties
    if (!blog.user || blog.user.toString() !== user.id.toString()) {
      return response.status(401).send("Unauthorized deletion tried");
    }
    
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).send("Blog deleted");
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