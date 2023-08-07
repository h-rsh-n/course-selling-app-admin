const mongoose = require('mongoose')

const admin = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:[true,'Username must be provided']
  },
  password:{
    type:String,
    required:[true,'Password must be provided']
  }
})

module.exports = mongoose.model('Admin',admin)