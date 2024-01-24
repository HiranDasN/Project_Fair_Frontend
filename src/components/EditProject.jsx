import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);

    const [projectInput,setProjectInput] = useState({
        id :project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
      })
    const [preview,setPreview] = useState("")

    const handleClose = () => { setShow(false); handleClose1() }
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(projectInput.projectImage){
            setPreview(URL.createObjectURL(projectInput.projectImage))
        }
    },[projectInput.projectImage])

    const handleClose1=()=>{
        setProjectInput({
        id : project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
        })

        setPreview("")
    }

    const handleUpdate = async()=>{

        const {title,language,github,website,overview,projectImage,id} = projectInput

        if(!title || !language || !github || !website || !overview){
            alert('please fill the form completely')
        }
        else{
            const reqBody =new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

        const token = sessionStorage.getItem("token")
        if(preview){
            const reqHeader = {
                "Content-Type" : "multipart/form-data",
                "Authorization" : `Bearer ${token}`
            }
            const result = await editProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
                alert('Updated Successfully')
                handleClose()
                setEditProjectResponse(result.data)
            }
            else{
                console.log(result.response.data);
            }
        }
        else{ 
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
              }
              const result = await editProjectAPI(id,reqBody,reqHeader)
              console.log(result);
              if(result.status === 200){
                alert('Updated Successfully')
                handleClose()
                setEditProjectResponse(result.data)
            }
            else{
                console.log(result.response.data);
            }
        }

    }
  }
  return (
    <div>
        <button onClick={handleShow} className='btn'> <i className="fa-solid fa-pen-to-square text-info"></i></button>

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
                <input id="image" type="file" style={{display:"none"}} onChange={e=>setProjectInput({...projectInput,projectImage:e.target.files[0]})}  />
                <img width={'100%'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="no image"  />
            </label>
        </Col>

        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            
                <div className='mb-3 w-100'>
                    <input type="text" value={projectInput.title} onChange={e=>setProjectInput({...projectInput,title:e.target.value})}    className='form-control' placeholder='Project Title' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text" value={projectInput.language} onChange={e=>setProjectInput({...projectInput,language:e.target.value})}   className='form-control' placeholder='Project Language' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text" value={projectInput.github} onChange={e=>setProjectInput({...projectInput,github:e.target.value})}    className='form-control' placeholder='Project GitHub Link' />
                </div>
    
                <div className='mb-3 w-100'>
                    <input type="text"    className='form-control' value={projectInput.website} onChange={e=>setProjectInput({...projectInput,website:e.target.value})} placeholder='Project Website Link' />
                </div>
    
                <div className='mb-3 w-100'>
                    <textarea type="text" value={projectInput.overview} onChange={e=>setProjectInput({...projectInput,overview:e.target.value})}    className='form-control' placeholder='Project Overview' />
                </div>

        </Col>

        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1} >Cancel</Button>
          <Button variant="success" onClick={handleUpdate} >Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProject