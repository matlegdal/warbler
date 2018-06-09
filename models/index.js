const mongoose = require('mongoose')

mongoose.set('debug', true)

mongoose.Promise = Promise

mongoose.connect(`mongodb://${process.env.MONGOHOST}/${process.env.DATABASENAME}`, {
  keepAlive: true
})

module.exports.User = require('./user')
module.exports.Message = require('./message')
