import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'

function Myproject() {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProject,setUserProject] = useState([])

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const getUserProject = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }

    const result = await userProjectAPI(reqHeader)
    console.log(result);
    setUserProject(result.data)

  }
  useEffect(()=>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])


  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }
    const result = await deleteProjectAPI(id,reqHeader)
    console.log(result);
    if(result.status === 200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }

  return (
    <div className='card shadow p-4'>
        <div className='d-flex'>
          
              <h3 className='text-success ms-3'>My Projects</h3>
              <div className='ms-auto'><Addproject/></div>
        </div>
        <div className='mt-4'>

        { userProject?.length>0?
        userProject?.map((item)=>(<div className='border d-flex align-items-center p-2 mb-3 rounded bg-light'>
        <h5>{item.title}</h5>
        <div className='ms-auto d-flex'>
           <EditProject project={item} />
           <a href={item.github} target='_blank' className='btn'> <i class="fa-brands fa-github text-success"></i></a>
           <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
        </div>
    </div>))
          :
        <p className='text-danger fw-bolder fs-4'>No Project Uploaded yet !!</p>}
    </div>
  </div>
  )
} 

export default Myproject