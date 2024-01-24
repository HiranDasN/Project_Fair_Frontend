import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({Dashboard}) {

  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)

    //to navigate to home page
    navigate('/')
  }

  return (
    <>
    <Navbar style={{backgroundColor:'orange'}}>
    <Container>
      <Navbar.Brand >
      <Link to={'/'} style={{textDecoration:'none',color:'black',fontWeight:'bolder',fontSize:'x-large'}}>
          <i class="fa-brands fa-stack-overflow fa-2x"></i>{' '}
          Project Fair
      </Link>
      </Navbar.Brand>
      {
        Dashboard &&
        <button onClick={handleLogout} className='btn btn-success'>Logout  <i class="fa-solid fa-right-from-bracket ms-1"></i></button>
      }
    </Container>
  </Navbar>
  </>
  )
}

export default Header