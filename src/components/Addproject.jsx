import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function Addproject() {
    const [show, setShow] = useState(false);

    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state to store token
  const [token,setToken] = useState("")

  const [projectInput,setProjectInput] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })
  console.log(projectInput);

  const handleClose1 =()=>{
    setProjectInput({
      title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
    })
    setPreview("")
  }

  //to hold the value of the image url
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(projectInput.projectImage){
      setPreview(URL.createObjectURL(projectInput.projectImage))
    }
  else{
    setPreview("")
  }
  },[projectInput.projectImage])

  console.log(preview);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])

  //add project
  const handleAdd =async (e)=>{
    e.preventDefault()
  
  const {title,language,github,website,overview,projectImage} = projectInput

  if(!title || !language || !github || !website || !overview || !projectImage){
    toast.warning('please fill the form completely')
  }
  else{
    //reqBody
    //step1) create object for form data since we have uploaded content
    const reqBody = new FormData()
    //step2) add data to FormData - append()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)

    
    if(token){

      const reqHeader ={
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`
      }

      const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        console.log(result.data);
        toast.success('Project added Successfully')
        handleClose()
        //context api
        setAddProjectResponse(result.data)

      }
      else{
        console.log(result.response.data);
      }

    }
  }
}
  return (
    <>
        <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>

        <Col md={6}>
         <label htmlFor="image" className='text-center'>
                <input id="image" type="file" style={{display:"none"}} onChange={(e)=>setProjectInput({...projectInput,projectImage:e.target.files[0]})} />
                <img width={'100%'} src={preview?preview:"https://cdn4.iconfinder.com/data/icons/technology-theme-flat-style-colorful-vector-icon-s/255/icon-122-512.png"} alt="no image"  />
            </label>
        </Col>

        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            
                <div className='mb-3 w-100'>
                    <input type="text"  value={projectInput.title} onChange={(e)=>setProjectInput({...projectInput,title:e.target.value})} className='form-control' placeholder='Project Title' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text"  value={projectInput.language} onChange={(e)=>setProjectInput({...projectInput,language:e.target.value})} className='form-control' placeholder='Project Language' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text"  value={projectInput.github} onChange={(e)=>setProjectInput({...projectInput,github:e.target.value})} className='form-control' placeholder='Project GitHub Link' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text"  value={projectInput.website} onChange={(e)=>setProjectInput({...projectInput,website:e.target.value})} className='form-control' placeholder='Project Website Link' />
                </div>
    
                <div className='mb-3 w-100'>
                    <textarea type="text"  value={projectInput.overview} onChange={(e)=>setProjectInput({...projectInput,overview:e.target.value})} className='form-control' placeholder='Project Overview' />
                </div>

        </Col>

        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Clear</Button>
          <Button variant="success" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Addproject