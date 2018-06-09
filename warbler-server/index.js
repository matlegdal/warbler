require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')

const db = require('./models')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')
const { loginRequired, ensureCorrectUser } = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/api/messages', loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({createdAt: 'desc'})
      .populate('user', {username: true, profileImageUrl: true})
    res.status(200).json(messages)
  } catch (error) {
    return next(error)
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messageRoutes)

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
