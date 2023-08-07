const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const authenticationMiddleware = (req,res,next)=>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(StatusCodes.BAD_REQUEST).json({msg:`No token provided`})
  }else{
    const token = authHeader.split(' ')[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
      if(err){
        res.status(StatusCodes.UNAUTHORIZED).json({msg:`Not authenticated`})
      }else{
        req.user = user
        next();
      }
    })
  }
}

module.exports = authenticationMiddleware;