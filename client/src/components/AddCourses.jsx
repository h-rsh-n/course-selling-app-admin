import { Box, TextField, Typography, InputLabel, Input, InputAdornment, Select, MenuItem,FormControl,Button} from "@mui/material";
import { useState } from "react";

const AddCourses = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [link,setLink] = useState('');
  const [price,setPrice] = useState('');

  const handleOnClick = ()=>{
    fetch("http://localhost:3000/admin/courses",{
      method:"POST",
      body:JSON.stringify({
        title,
        description,
        price,
        published:selectedOption,
        imageLink:link
      }),
      headers:{
        "Content-Type":"application/json",
        "Authorization" : "Bearer "+localStorage.getItem('token')
      }
    }).then((res)=>{
      setTitle('')
      setDescription('')
      setLink('')
      setPrice('')
      if(res.status === 201){
        alert('Course Added successfully')
      }
      return res.json();
    }).then((data)=>{
      console.log(data)
    })
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}>
        <Box
          sx={{
            width: 600,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
            borderRadius: '8px',
            p: 2,
            backgroundColor: "whitesmoke",
            height: 500
          }}
        >
          <div>
            <center style={{ paddingTop: 5 }}>
              <Typography variant="h4" style={{fontStyle:"italic"}}>Create a Course</Typography>
            </center>
            <br /><br/>
            <TextField placeholder="Enter the title of the course" value={title} label="Title" variant="outlined" fullWidth required onChange={(e)=> setTitle(e.target.value)} color="secondary"/>
            <br /><br />
            <TextField placeholder="Description of the course" value={description} label="Description" multiline rows={2} fullWidth required onChange={(e)=> setDescription(e.target.value)} color="secondary"/>
            <br /><br />
            <TextField placeholder="Image link for the course" value={link} label="ImageLink" variant="outlined" fullWidth required onChange={(e)=> setLink(e.target.value)} color="secondary"/>
            <br /><br />
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <FormControl  sx={{ m: 1 }} variant="standard" color="secondary">
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
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
          <div style={{paddingRight:60, paddingTop:30, display:"flex",justifyContent:"flex-end"}}>
          <Button variant="contained" size="large" style={{backgroundColor:"#a435f0",color:"whitesmoke",width:95}} onClick={handleOnClick}>CREATE</Button>
          </div>
        </Box>
      </div>
    </>
  )
}

export default AddCourses;
