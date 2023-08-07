import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const LandingPage = () =>{
  return(
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{marginTop:75,padding:70,marginLeft:60}}>
        <Typography variant="h2" fontWeight="bold">Build supercharged</Typography>
        <Typography variant="h2" fontWeight="bold">online courses</Typography>
        <Typography variant="h5" style={{paddingTop:10}}>Empower minds and shape the future of education with Coursera</Typography>
        <Typography variant="h5" style={{marginBottom:25}}>Let's embark on this journey together!</Typography>
       <Link to={'/signup'}><Button variant="contained" size="large" style={{backgroundColor:"#a435f0",color:"whitesmoke"}}>Start Learning</Button></Link>
      </div>
    </div>
  )
}

export default LandingPage;