import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row ,Col } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'
function Dashboard() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
   console.log(username); 
  return (
    <>
    <Header Dashboard/>
    
    <h3 className='mt-5 ms-3' style={{color:'black',fontWeight:'bold'}}>Welcome<span className='ms-2 text-success' >{username}</span></h3>

    <Row className='container-fluid mt-5'> 

    <Col md={8}>
      <Myproject/>
    </Col>
    
    <Col md={4}>
    <Profile/>
    </Col>


    </Row>
      
    </>
  )
}

export default Dashboard