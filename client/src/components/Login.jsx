import {Typography,TextField,Button,Box, Divider } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
const Login = ()=>{

  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleClick = () =>{
    fetch("http://localhost:3000/admin/login",{
      method:"POST",
      body:JSON.stringify({
        username,
        password
      }),
      headers:{
        "Content-Type":"application/json",
        username,
        password
      }
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      localStorage.setItem('token',data.token)
      setUser({
        isLoading:false,
        userEmail:username
      });
      navigate('/home')
    })
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"center",paddingTop:75}}>
        <Typography variant="h4">Hello! Welcome back.</Typography>
      </div>
      <div style={{display:"flex",justifyContent:"center",paddingTop:30}}>
        <div>
        <Box
          sx={{
            width:400,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
            borderRadius: '8px', 
            p: 2, 
            backgroundColor:"whitesmoke",
            height:350
          }}
        >
        
          <center>
          <Typography  variant="h5" style={{paddingBottom:5}}>Login.</Typography>
          <Divider style={{paddingTop:5}}/>
          <br/><br/>
          <TextField label="Username" variant="standard" fullWidth color="secondary" onChange={(e)=> setUsername(e.target.value)}/>
          <br/><br/>
          <TextField type="password" label="Password" variant="standard" fullWidth color="secondary" onChange={(e)=> setPassword(e.target.value)}/>
          <br/><br/>
          <Button variant="contained" size="large" style={{backgroundColor:"#a435f0",color:"whitesmoke",width:95}} onClick={handleClick}>Login</Button>
          </center>
          <br/>
          <div style={{display:"flex"}}>
          <Typography style={{padding:2,margin:4}}>Don't have an account?</Typography>
          <Link to={'/signup'}><Button style={{color:"#a435f0"}}>Signup</Button></Link>
          </div>
        
        </Box>
        </div>
      </div>
    </div>
  )
}

export default Login;