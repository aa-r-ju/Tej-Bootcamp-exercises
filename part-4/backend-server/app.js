const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
const notesControllers = require("./controllers/routes")
const mongoose = require('mongoose')
require('mongodb')
const {url} = require("./utils/config")
const {errorHandler,unknownEndpoint} = require("./utils/middleware")


mongoose.connect(url)


app.use(cors())
app.use(express.static("dist"))


app.use(errorHandler)
app.use("/api/blogs", notesControllers)

app.use(unknownEndpoint)


module.exports = app;