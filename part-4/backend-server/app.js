const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
const notesControllers = require("./controllers/routes")
const usersControllers = require("./controllers/users")
const mongoose = require('mongoose')
require('mongodb')
const {url} = require("./utils/config")
const {errorHandler,unknownEndpoint} = require("./utils/middleware")
const loginController = require("./controllers/login")



mongoose.connect(url)


app.use(cors())
app.use(express.static("dist"))


app.use(errorHandler)
app.use("/api/blogs", notesControllers)
app.use("/api/users", usersControllers)
app.use("/api/login", loginController)


app.use(unknownEndpoint)


module.exports = app;