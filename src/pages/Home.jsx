import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import titleImage from '../Images/custom-software-1.png'
import { Row, Col } from 'react-bootstrap'
import Cards from '../components/Cards'
import { homeProjectAPI } from '../services/allAPI'
function Home({token}) {
   
  
  
  
  const [session,setSession] = useState(false)
  const [homeProject,setHomeProject] = useState([  ])



  const gethomeProject = async()=>{
    const result = await homeProjectAPI()
    console.log(result.data);
    setHomeProject(result.data )
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setSession(true)
    }
    else{
      setSession(false)
    }
  },[])

  useEffect(()=>{
    gethomeProject()
  },[])

  console.log(session);
  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'orange'}}>
     <div className='container-fluid rounded'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{fontSize:'80px',color:'white'}}>Project Fair</h1>
            <p>One stop destination for all software development projects</p>
            {}
            {session?
              <Link to={'/dashboard'} className='btn btn-success rounded'>Manage Project <i class="fa-solid fa-arrow-right ms-3"></i></Link>
              :
            <Link to={'/register'} className='btn btn-success rounded'>Get Started <i class="fa-solid fa-arrow-right ms-3"></i></Link>
            }
          </Col>
          <Col sm={12} md={6}>
          <img src={titleImage} alt="no img" className='w-75' style={{marginTop:'100px'}} />
          </Col>
        </Row>
  
     </div>
    </div>
    <div className='all-project mt-5'>
      <h1 className='text-center mt-5' style={{fontWeight:'bold'}}>Explore Our Project</h1>
    <marquee scrollAmount={20} className="mt-5">
      <div  className='d-flex'>
          { homeProject?.length>0?
            homeProject.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
            <Cards project={item}/ >
            </div>))
          :null
          }
      </div>
    </marquee>
    <div className='text-center'>
      <Link className='text-dark' to={'/project'}>See More Projects</Link>
    </div>

    </div>
    </>
   
  )
}

export default Home