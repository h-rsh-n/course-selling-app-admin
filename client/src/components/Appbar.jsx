import { Button,Box,Tooltip,IconButton,Avatar,Menu,MenuItem, Typography } from '@mui/material';
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {isUserLoading} from "../store/selectors/isUserLoading"
import { userState } from '../store/atoms/user';
import { userEmailState } from '../store/selectors/userEmail';

export const Logo = ()=>{
  return(
    <div>
      <a href='/'>
      <img 
      src={logo} 
      width={100} style={{margin:4,padding:2}} ></img>
      </a>
    </div>
  )
}
const Appbar = ()=>{
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState)
  const setUser = useSetRecoilState(userState)

  if(userEmail){

    return(
      <div style={{ display: "flex", justifyContent: "space-between", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",position:"sticky",top:0,zIndex:1020,backgroundColor:"#f7f2f6"}}>
       <Logo />
        <div style={{ padding: 7, margin: 5, marginRight: 10 }}>
          <Tooltip title={`Logged in as ${userEmail}`}>
            <IconButton color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <span style={{ padding: 10 }}>
            <Button 
            onClick={() => { 
              localStorage.setItem('token', null); 
              setUser({
                isLoading:false,
                userEmail:null
              }) 
              navigate('/')}} 
              variant="contained" size='medium' style={{ backgroundColor: "black" }}>Logout</Button>
          </span>
        </div>
      </div>
    )
  }
else{
  return(
    <div style={{ display: "flex", justifyContent: "space-between", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Logo/>
      <div style={{padding:7,margin:10,marginRight:15}}>
      <span style={{padding:10}}>
      <Link to={'/login'}><Button variant="contained" size='medium' style={{backgroundColor:"whitesmoke",color:"black"}}>Login</Button></Link>
      </span>
      <Button variant="contained" size='medium' style={{backgroundColor:"black"}} onClick={()=>navigate('/signup')}>Signup</Button>
      </div>
    </div>
  )
}
}
export default Appbar;