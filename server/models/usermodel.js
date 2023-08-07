const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username:String,
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
})

module.exports = mongoose.model('User',user);