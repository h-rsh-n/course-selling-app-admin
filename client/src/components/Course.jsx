import { Card,Grid,TextField, Typography, InputLabel, Input, InputAdornment, Select, MenuItem,FormControl,Button} from "@mui/material";
import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseDetails, courseImage, coursePrice, courseTitle, isCourseLoading, selectItem } from "../store/selectors/course";
import { Loader2 } from "./Loading";
const Course = () => {

  const {courseId} = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(isCourseLoading)

  useEffect(()=>{
    fetch(`http://localhost:3000/admin/course/${courseId}`,{
      method:"GET",
      headers:{
        "Content-type":"application-json",
        "Authorization":"Bearer "+localStorage.getItem('token')
      }
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data)
      setCourse({course:data.course,isLoading:false})
    }).catch((e)=>{
      setCourse({isLoading:false,course:null})
    })
  },[])


  if(isLoading){
    return(
      <>
      </>
    )
  }

  return (
    <div>
      <GrayTopper/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard/>
            </Grid>
        </Grid>
    </div>
  )
}

const GrayTopper = ()=>{
  const title = useRecoilValue(courseTitle)
  return (
  <div style={{height: 200, background: "rgb(164 53 240/.6)", top:0, width: "100vw", zIndex: 0, marginBottom: -250,marginTop:"2px"}}>
    <div style={{ height: 200, display: "flex", justifyContent: "space-evenly", flexDirection: "column",marginLeft:"80px"}}>
      <div>
          <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
              {title}
          </Typography>
      </div>
    </div>
  </div>
)
}

const UpdateCard = ()=>{
  const[course,setCourse] = useRecoilState(courseState)

  
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [link,setLink] = useState('');
  const [price,setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Populate the state variables with the course data once it's available
    if (course.course) {
      setTitle(course.course.title);
      setDescription(course.course.description);
      setLink(course.course.imageLink);
      setPrice(course.course.price);
      setSelectedOption(course.course.published);
    }
  }, [course]);

  const handleOnClick = ()=>{
    fetch(`http://localhost:3000/admin/course/`+course.course._id,{
      method:"PUT",
      body:JSON.stringify({
        title:title,
        description:description,
        imageLink:link,
        price:price,
        published:selectedOption
      }),
      headers:{
        "Content-type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')
      },
    }).then((response)=>{
        if(response.status===200){
        alert('Course Updated Successfully')
      }
      let UpdatedCourse= {
        title:title,
        description:description,
        imageLink:link,
        price:price,
        published:selectedOption
      }
      setCourse({course:UpdatedCourse,isLoading:false})
    })
  }

 return(
  <div style={{display: "flex", justifyContent: "center",color:"whitesmoke"}}>
    <Card varint={"outlined"} style={{width: "500px", marginTop: 200, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',backgroundColor:"whitesmoke"}}>
      <div style={{padding: 20}}>
        <Typography variant='h5' style={{fontStyle:"oblique"}}>Update a Course</Typography>
          <br />
            <TextField placeholder="Enter the title of the course" value={title} label="Title" variant="outlined" fullWidth required color="secondary" onChange={(e)=> setTitle(e.target.value)}/>
            <br /><br />
            <TextField placeholder="Description of the course" value={description} label="Description" multiline rows={2} fullWidth required color="secondary" onChange={(e)=> setDescription(e.target.value)}/>
            <br /><br />
            <TextField placeholder="Image link for the course" value={link} label="ImageLink" variant="outlined" fullWidth required color="secondary" onChange={(e)=> setLink(e.target.value)}/>
            <br /><br />
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <FormControl  sx={{ m: 1 }} variant="standard" color="secondary">
                <InputLabel htmlFor="standard-adornment-amount" color="secondary">Amount</InputLabel>
                  <Input
                    value={price}
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={(e)=> setPrice(e.target.value)}
                  />
              </FormControl>
              <FormControl variant="standard" sx={{ mr:5,mt:1, minWidth: 120 }} color="secondary">
                <InputLabel id="demo-simple-select-standard-label">Published</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedOption}
                    onChange={(e)=> setSelectedOption(e.target.value)}
                    label="Age"
                  >
                    <MenuItem value={true}>Publish Now</MenuItem>
                    <MenuItem value={false}>Publish Later</MenuItem>
                  </Select>
              </FormControl>
            </div>
      </div>
      <div style={{paddingRight:60, paddingBottom:20, display:"flex",justifyContent:"flex-end"}}>
          <Button variant="contained" size="large" style={{backgroundColor:"#a435f0",color:"whitesmoke",width:95}} onClick={handleOnClick}>UPDATE</Button>
          </div>
    </Card>
  </div>
 )
}

const CourseCard = ()=>{
  const imageLink = useRecoilValue(courseImage);
  const title = useRecoilValue(courseTitle);
  const price = useRecoilValue(coursePrice);
  const selectedOption = useRecoilValue(selectItem)
 return(
  <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 400,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2,
        marginTop:"125px"
    }}>
        <img src={imageLink} style={{width: 400}} ></img>
        <div>
            <Typography variant="h5" style={{fontStyle:"italic",fontWeight:"bold"}} textAlign={"center"}>{title}</Typography>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
              <div style={{backgroundColor:"rgb(250 176 5/.15)",paddingLeft:"5px",paddingRight:"5px",borderRadius:"50px"}}>
                <Typography variant="subtitle2" style={{padding:"2px",marginLeft:"7px",marginRight:"7px",fontWeight:700,fontSize:"1.2rem"}} color={"rgb(250, 176, 5)"}>${price}</Typography>
              </div>
              <div>
              {
                selectedOption?(
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
            </div>
          </div>
      </Card>
  </div>
)
}

export default Course