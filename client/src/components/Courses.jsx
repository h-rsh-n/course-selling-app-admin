import { Box, Button, Card, Container, IconButton, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from "react-router-dom";
import { Loader2 } from "./Loading";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";

const Courses = ()=>{

  const [courses,setCourses] = useState([])
  const [deleted,setDeleted] = useState(1);
  
  const [loadarr] = useState([1,1,1])

  useEffect(()=>{
    fetch("http://localhost:3000/admin/courses",{
      method:"GET",
      headers:{
        Authorization:"Bearer "+localStorage.getItem('token')
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      setCourses(data.course)

    })
  },[deleted])


  if(courses.length===0){
    return(
      <div style={{marginLeft:"360px",marginTop:"100px"}}>
        <div style={{paddingLeft:"10px",display:"flex"}}>
          {
            loadarr.map(()=>{
              return(
                <Loader2/>
              )
            })
          }
        </div>
      </div>
    )
  }

  return(
    <>
    <Typography variant="h5" style={{marginTop:15,letterSpacing:"0.01px",fontWeight:700}} textAlign={"center"}>Courses</Typography>
    <div>
    <div style={{display:"flex",direction:"column",flexWrap:"wrap",justifyContent:"flex-start",padding:10,marginTop:10,alignItems:"center",paddingLeft:"350px"}}>
      {
        courses.map((item)=>{
          return(
            <CourseCard course={item} key={item._id} setDeleted={setDeleted} deleted={deleted}/>
          )
        })
      }
    </div>
    </div>
    </>
  )
}

export const CourseCard = (props)=>{

  const navigate = useNavigate()

  const handleOnClick = (id)=>{
    fetch(`http://localhost:3000/admin/course/`+id,{
      method:"DELETE",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('token'),
        "Content-type":"application/json"
      }
    }).then((res)=>{
      if(res.status==200){
       props.setDeleted(id)
      }
    })
  }

  return(
    <div style={{padding:5}}>
       <Card
      style={{
        margin: 10,
        width: 375,
        maxHeight: "100%",
        zIndex: -1,
        borderRadius: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow here
      }}
    >
        <img src={props.course.imageLink} style={{width:"100%",height:"300px"}}></img>
        <Typography textAlign={"center"} variant="h4" style={{padding:"5px",fontWeight:700}}>{props.course.title}</Typography>
        <Typography  variant="subtitle2" style={{marginInline:"25px",fontSize:"1rem",maxHeight:"70px"}}>{props.course.description}</Typography>
        <Typography variant="body2" style={{marginLeft:"25px",fontWeight:700,fontSize:"1.2rem"}}>${props.course.price}</Typography>
        <div style={{paddingTop:"10px",display:"flex",justifyContent:"space-evenly"}}>
        <Button variant="text" startIcon={<DeleteIcon />} style={{color:"#a435f0"}} onClick={()=>handleOnClick(props.course._id)}>
            Delete
        </Button>
        <Button style={{borderRadius:"5px",backgroundColor:"#a435f0"}} variant="contained"
        onClick={()=>{
          navigate(`/course/${props.course._id}`)
        }}>Update Course</Button>
        </div>
        <br/>
      </Card>
    </div>
  )
} 

export default Courses;
