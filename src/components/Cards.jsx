import React from 'react'
import { useState } from 'react';
import { Row , Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import videoPlayer from '../Images/Screenshot 2023-11-22 121852.png'
import { BASE_URL } from '../services/baseurl';
function Cards({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card className='btn shadow' onClick={handleShow} >
      <Card.Img variant="top" height={'250px'} src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoPlayer} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{height:'200px'}}>
            <Col md={6}>
              <img src={`${BASE_URL}/uploads/${project.projectImage}`} width={'100%'} alt="no img" />
            </Col>
            <Col md={6}>
              <h4>Discription</h4>
            <p>{project.overview }</p>
            <p><span className='fw-bolder'>Technologies</span>:{project.language}</p>
            </Col>
          </Row>
          <div className='d-flex'>
            <a style={{color:'grey'}} href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{color:'grey'}} href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Cards