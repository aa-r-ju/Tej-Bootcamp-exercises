const Blog = require("../models/note")
const app = require("express").Router()
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const { tokenExtractor } = require("../utils/middleware");

app.get('/', async (request, response, next) => {
  try {
    let result = await Blog.find({}).populate("user",{username:1, name: 1});
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



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


  
app.post('/',tokenExtractor, async(request, response, next) => {
 
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    // const bloguser = await User.findById(decodedToken.id)
    const bloguser = await User.findById(request.user);

     const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: request.user,
  });
   
    const result = await blog.save();
    bloguser.Blog = bloguser.Blog.concat(result._id)
    await bloguser.save()
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


app.delete('/:id', async (request, response,next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).send("Blog deleted");
    } else {
      response.status(401).send("Unauthorized deletion tried");
    }
  }
  catch (error) {
    next(error)
  }
})


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

