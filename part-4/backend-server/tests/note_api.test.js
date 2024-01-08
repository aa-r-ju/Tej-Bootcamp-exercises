const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/note')
const helpers =require("./test_helper")


beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(helpers.initialNotes[0])
  await noteObject.save()
  noteObject = new Blog(helpers.initialNotes[1])
  await noteObject.save()
})

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},10000)

test('there are two blogs', async () => {
    const response = await helpers.notesInDb()
  
    expect(response).toHaveLength(helpers.initialNotes.length)
  })
  
  test('the first blog is about HTTP methods', async () => {
    const response = await helpers.notesInDb()
  
    expect(response[0].title).toBe(helpers.initialNotes[0].title)
  })

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const returnBlog = response.body;
    returnBlog.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });


  test('a valid note can be added', async () => {
    const newNote = {
        title: 'async/await simplifies making async calls',
        author: "Aarju",
        url: "http://localhost:3006/api/notes",
        likes: 15
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helpers.initialNotes.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  
  test('missing "likes" property defaults to 0', async () => {
    const newBlog = {
      title: "No Likes Blog",
      author: "No Likes Author",
      url: "noLikesLink",
    };
  
    const response = await api.post("/api/blogs").send(newBlog);
  
    expect(response.body.likes).toBe(0);
  });

  test('show "400" if title and url missing', async () => {
  const testBlog = {
    author: "missing title",
    likes:1
  }  
 await api.post('/api/blogs').send(testBlog).expect(400)
})

test('DELETE /api/blogs/:id deletes a single blog post', async () => {
    const initialBlogs = await helpers.notesInDb();
    const blogToDelete = initialBlogs[0];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
  
    const blogsAfterDelete = await helpers.notesInDb();
  
    expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1);
  
    const ids = blogsAfterDelete.map(blog => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });

  test('PUT /api/blogs/:id updates the likes of a single blog post', async () => {
    const initialBlogs = await helpers.notesInDb();
    const blogToUpdate = initialBlogs[0];
  
    const updatedBlogData = {
      likes: blogToUpdate.likes + 1,
    };
  
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200);
  
    expect(response.body.likes).toBe(blogToUpdate.likes + 1);
  });

afterAll(async () => {
  await mongoose.connection.close()
})