require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')

const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
  res.send('Hello world')
})

app.use('/api/auth', authRoutes)
app.use('/api/users/:id/messages', messageRoutes)

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Listening on ' + port)
})
