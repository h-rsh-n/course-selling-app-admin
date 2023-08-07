import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Appbar from './Appbar'
import Login from './Login'
import Signup from './Signup'
import AddCourses from './AddCourses';
import Courses from './Courses';
import Course from './Course';
import LandingPage from './LandingPage';
import Sidebar from './Sidebar';
import Home from './Home';
import {userState} from "../store/atoms/user"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useEffect } from 'react';




const App = ()=>{
  return(
    <div style={{Maxwidth:"100vw",minHeight:"100vh",backgroundColor:"#f7f2f6"}}>
      <RecoilRoot>
        <Router>
          <InitUser/>
          <Appbar/>
          <Sidebar/>
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='home' element={<Home/>}/>
              <Route path="/addcourse" element={<AddCourses/>}/>
              <Route path="/courses" element={<Courses/>}/>
              <Route path="/course/:courseId" element={<Course/>}/>
            </Routes>
        </Router>
      </RecoilRoot>
    </div>
  )
}

const InitUser = ()=>{
  const setUser = useSetRecoilState(userState);
  useEffect(()=>{
    fetch("http://localhost:3000/admin/log",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      if(data.username){
        setUser({
          isLoading:false,
          userEmail:data.username
        })
      }else{
        setUser({
          isLoading:false,
          userEmail:null
        })
      }
    }).catch((error)=>{
      setUser({
        isLoading:false,
        userEmail:null
      })
    })
  },[])

  return <></>
}

export default App;