const Note = require('../models/note')

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

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}