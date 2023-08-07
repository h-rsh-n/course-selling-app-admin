import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Loader1 } from './Loading';

const Home = () => {

  const [course,setCourse] = useState([]);
  const [loadarr] = useState([1,1,1,1])

  useEffect(()=>{
    fetch("http://localhost:3000/admin/courses",{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')
      }
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      setCourse(data.course);
    })
  },[])

  if(course.length==0){
    return(
      <div style={{paddingTop:"10px",paddingLeft:"290px"}}>
        <Typography variant="h5" style={{marginTop:"10px",letterSpacing:"0.01px",fontWeight:700,marginLeft:"500px"}}>Overview</Typography>
      <div style={{marginTop:"60px"}}>
        <div>
           {
            loadarr.map(()=>{
              return(
                <Loader1/>
              )
            })
           }
        </div>
      </div>
    </div>
    )
  }
 



  return (
    <div style={{paddingTop:"10px",paddingLeft:"290px"}}>
      <Typography variant="h5" style={{marginTop:"10px",letterSpacing:"0.01px",fontWeight:700,marginLeft:"500px"}}>Overview</Typography>
    <div >
        <div style={{margin:"20px"}}>
          {
            course.map((item)=>{
              return <DetailsCard course={item} key={item._id}/>
            })
          } 
        </div>
    </div>
    </div>
  )
}

const DetailsCard = (props)=>{
  return(
    <div key={props.course.courseId} style={{padding:"4px"}}>
      <Card style={{width:"450px",height:"82px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"10px",backgroundColor:"whitesmoke"}}>
        
            <div style={{margin:"5px",marginLeft:"10px"}}>
              <Typography variant='h6' style={{fontFamily:"cursive"}}>{props.course.title}</Typography>
            </div>
            <div style={{display:'flex'}}>
              <div style={{margin:"3px",marginLeft:"10px"}}>
                {
                  props.course.published?(
                    <div style={{backgroundColor:"rgb(59 130 246 / .25)",padding:"3px",borderRadius:"50px"}}>
                      <Typography variant='subtitle2' style={{padding:"2px",marginLeft:"5px",marginRight:"5px",fontWeight:"bold",letterSpacing:"0.4px"}} color={"rgb(59 130 246)"}>PUBLISHED</Typography>
                    </div>
                  ):(
                    <div style={{backgroundColor:"rgb(250 82 82/ .25)",padding:"3px",borderRadius:"50px"}}>
                      <Typography variant='subtitle2' style={{padding:"2px",marginLeft:"5px",marginRight:"5px",fontWeight:"bold",letterSpacing:"0.4px"}} color={"rgb(250, 82, 82)"}>!PUBLISHED</Typography>
                    </div>
                  )
                }
              </div>
              <div style={{marginLeft:"60px",marginTop:"6px",marginBottom:"2px"}}>
                  <div style={{backgroundColor:"rgb(250 176 5/.15)",padding:"2px",borderRadius:"50px"}}>
                      <Typography variant='subtitle2' style={{padding:"2px",marginLeft:"5px",marginRight:"5px",fontWeight:"bold",letterSpacing:"0.4px",fontStyle:"italic"}} color={"rgb(250, 176, 5)"}> ${props.course.price}</Typography>
                  </div>
              </div>
            </div>
          
      </Card>
    </div>
  )
} 

export default Home