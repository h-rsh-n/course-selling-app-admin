const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const PORT = 3000;
const adminrouter = require('./routes/adminroute');
const userrouter = require('./routes/userroute');
const cors = require('cors')
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use('/admin',adminrouter);
app.use('/users',userrouter);


const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,()=>{
      console.log(`server is listening on port ${PORT}`)
    })
  }
  catch(error){
    console.log(error)
  }
}

start();