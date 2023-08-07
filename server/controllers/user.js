const User = require('../models/usermodel');
const Course = require('../models/coursemodel')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');

const signup = async(req,res)=>{
  const {username,password} = req.body

  if(!username || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:`username and password must be provided`})
  }
  const isUser = await User.findOne({username})
  if(!isUser){
    const user = await User.create(req.body);
    const token = jwt.sign({username,role:"user"},process.env.JWT_SECRET,{expiresIn:'10h'})
    res.status(StatusCodes.CREATED).json({msg:`user created`,token})
  }else{
    res.status(StatusCodes.BAD_REQUEST).json({msg:`user already exists`});
  }
}

const login = async(req,res)=>{
  const {username,password} = req.headers
  const user = await User.findOne({username,password});
  if(user){
    const token = jwt.sign({username,role:"user"},process.env.JWT_SECRET,{expiresIn:'10h'})
    res.status(StatusCodes.OK).json({msg:`logged in successfully`,token})
  }else{
    res.status(StatusCodes.BAD_REQUEST).json({msg:'login failed'})
  }
}

const showCourses = async(req,res)=>{
  const course = await Course.find({published:true})
  if(course){
    res.status(StatusCodes.OK).json({course})
  }else{
    res.json({msg:`No courses available`})
  }
}

const purchaseCourse = async(req,res)=>{
  const course = await Course.findById(req.params.courseId)
  if(course){
    const user = await User.findOne({username:req.user.username})
    if(user){
      user.purchasedCourses.push(course)
      await user.save()
      res.status(200).json({msg:`Course purchased successfully`})
    }else{
      res.json({msg:`User not found`})
    }
  }else{
    res.json({msg:`Course not found`})
  }
}

const showPurchasedCourse = async(req,res)=>{
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses')
  if(user){
    res.status(StatusCodes.OK).json({purchaseCourse:user.purchasedCourses || []})
  }else{
    res.json({msg:`user not found`})
  }
}

module.exports = {
  login,
  signup,
  showCourses,
  purchaseCourse,
  showPurchasedCourse
}