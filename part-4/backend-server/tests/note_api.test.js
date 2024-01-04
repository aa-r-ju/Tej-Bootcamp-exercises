const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/note')

const initialNotes = [
  {
    title: 'Blog-list',
    author: "Aarju",
    url: "http://localhost:3005/api/notes",
    likes: 5
  },
  {
    title: 'Second-Blog',
    author: "Aarju",
    url: "http://localhost:3005/api/notes",
    likes: 15
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialNotes[0])
  await noteObject.save()
  noteObject = new Blog(initialNotes[1])
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
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialNotes.length)
  })
  
  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe(initialNotes.length[0].title)
  })

afterAll(async () => {
  await mongoose.connection.close()
})