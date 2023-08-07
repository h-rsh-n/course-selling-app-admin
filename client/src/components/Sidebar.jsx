import { Card, Typography,Button, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { userEmailState } from "../store/selectors/userEmail"

const Sidebar = ()=>{

  const userEmail = useRecoilValue(userEmailState)


  if(!userEmail){
    return(
      <></>
    )
  }

  return(
    <div>
      <Card style={{
        width:"280px",
        position:"fixed",
        height:"100%",
        backgroundColor:"whitesmoke",
        marginTop:"2px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{marginTop:"20px",marginLeft:"50px", marginBottom:"20px", flex:"display",flexDirection:"column",alignItems:"flex-start"}}>
          <div>
            <Typography fontFamily="sans-serif" variant="h7" style={{letterSpacing:'0.2px',fontWeight:"bold",color:"#495057",padding:"5px"}}>MAIN MENU</Typography>
          </div>
          <Divider style={{paddingTop:"5px"}}/>
          <div style={{marginTop:"15px"}}>
            <Link to={'/home'}><Button variant="text" size="large" style={{color:"#a435f0"}}>Home</Button></Link>
          </div>
          <div style={{marginTop:"8px"}}>
           <Link to={'/courses'}><Button variant="text" size="large" style={{color:"#a435f0"}}>Courses</Button></Link> 
          </div>
          <div style={{marginTop:"8px"}}>
           <Link to={'/addcourse'}><Button variant="text" size="large" style={{color:"#a435f0"}}>Add a Course</Button></Link> 
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Sidebar