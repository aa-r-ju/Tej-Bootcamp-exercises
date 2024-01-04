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

  

afterAll(async () => {
  await mongoose.connection.close()
})