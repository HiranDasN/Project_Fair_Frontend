import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { Row , Col } from 'react-bootstrap';
import Cards from '../components/Cards';
import { allProjectAPI } from '../services/allAPI';

function Project() {

const [allProject,setAllProject] = useState([])
const [searchKey,setSearchKey] = useState("")
const [isToken,setIsToken] = useState(false)

const getAllProject = async()=>{

  if(sessionStorage.getItem("token")){
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }

  const result = await allProjectAPI(searchKey,reqHeader)
  console.log(result.data);
  if(result.status === 200){
    setAllProject(result.data)
   }
  } 
}

console.log(searchKey);

useEffect(()=>{
  getAllProject()
},[searchKey])

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setIsToken(true)
  }
},[])
  return (
    <>
    <Header/>

    <div style={{marginTop:'100px'}} className='text-center'>
      <h1 style={{textAlign:'center'}}>All Project</h1>
    
    <div className='d-flex justify-content-center align-items-center mt-5'>
    <div className='d-flex w-25'>
      <input
                      type="text"
                      value={searchKey}
                      onChange={e=>setSearchKey(e.target.value)}
                      placeholder="Search using technologies" 
                      className="form-control"
                      
      />
      <i style={{marginLeft:'-40px',color:'grey'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
    </div>
    </div>
    </div>
    
    <Row className='mt-5 container-fluid'>
           {allProject?.length>0?
           allProject?.map((item)=>(<Col className='mb-5' lg={4} md={6} sm={12}>
            <Cards project={item}/>
            </Col>))
            :
           <div>

           {isToken?<p className='text-center text-danger fw-2 fs-2 mt-5'>Sorry no such project currently Available</p>

           :
             <div className='d-flex justify-content-center align-items-center flex-column'> 
              <img src="https://www.marketingmilk.com/wp-content/uploads/2019/07/lock-gif.gif" alt="login gif" height={'300px'} width={'300px'}/>
              <p className='text-danger fw-2 fs-2 mt-5'>Please  <Link style={{textDecoration:'none'}} to={'/login'} className='text-info'>Login</Link> to view More Project</p>
             </div>}
           </div>
           }
    </Row>
    
    </>
  )
}

export default Project