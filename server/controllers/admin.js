const Admin = require('../models/adminmodel');
const Course = require('../models/coursemodel')
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes')
//make sure the username is unique


const log = async(req,res)=>{
  res.status(StatusCodes.OK).json({
    username:req.user.username
  })
}

const signup = async (req,res)=>{
  const {username,password} = req.body
  if(!username || !password){
    res.status(StatusCodes.BAD_REQUEST).json({msg:`username and password must be provided`})
  }
  const isadmin = await Admin.findOne({username})
  if(isadmin){
    res.status(StatusCodes.BAD_REQUEST).json({msg:`admin already exists`})
  }else{
    const admin = await Admin.create(req.body);
    const token = jwt.sign({username,role:"admin"},process.env.JWT_SECRET,{expiresIn:'10h'})
    res.status(StatusCodes.CREATED).json({msg:`admin created successfully`,token})
  }
}

const login = async (req,res)=>{
  const {username,password} = req.headers
  const admin = await Admin.findOne({username,password})
  if(admin){
    const token = jwt.sign({username,role:"admin"},process.env.JWT_SECRET,{expiresIn:'10h'})
    res.status(StatusCodes.ACCEPTED).json({msg:`Logged in successfully`,token})
  }else{
    res.status(StatusCodes.BAD_REQUEST).json({msg:`invalid username or password`})
  }

}

const createCourse = async (req,res)=>{
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json({msg:`Course created`,course});
}

const updateCourse = async(req,res)=>{
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });

    if (course) {
      res.status(StatusCodes.OK).json({ msg: 'Updated successfully', course });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: 'Update failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred', error: error.message });
  }
}

const showCourse = async (req,res)=>{
  const course = await Course.find({})
  if(course){
    res.status(StatusCodes.OK).json({course})
  }else{
    res.json({msg:`no courses available`})
  }
}

const getCourse = async (req,res)=>{
  const course = await Course.findById(req.params.courseId);
  if(!course){
    res.status(StatusCodes.NOT_FOUND).json({msg:`Course not found`})
  }else{
    res.status(StatusCodes.OK).json({msg:'Course Found',course})
  }
}

const deleteCourse = async (req,res)=>{
  try {
    //console.log(req.params.courseId)
    await Course.findByIdAndDelete(req.params.courseId)
    res.status(StatusCodes.OK).json({msg:`Course Deleted Successfully`})
  } catch (error) {
    console.error(error)
  }
}

module.exports={
  log,
  signup,
  login,
  createCourse,
  updateCourse,
  showCourse,
  getCourse,
  deleteCourse
}

