import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{ minHeight: '300px', backgroundColor: 'orange' }} className='d-flex flex-column align-items-center'>
      <div className='footer d-flex flex-wrap justify-content-evenly align-items-evenly w-100 mt-4'>
        <div className='website mb-4' style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className='mb-4' style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
            <i className="fab fa-stack-overflow fa-2x me-3"></i>
            Project Fair
          </h4>
          <p style={{ color: 'black', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vero illo expedita eum labore.
            Doloremque vel, ipsam mollitia perferendis ducimus eveniet nam aut autem modi sint maiores possimus
          </p>
        </div>
        <div className='links mb-4'>
          <h4 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }} className='mb-4'>
            Links
          </h4>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Home Page
          </Link>
          <Link to={'/login'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Login Page
          </Link>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Register Page
          </Link>
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Dashboard Page
          </Link>
          <Link to={'/project'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Project Page
          </Link>
        </div>
        <div className='guides mb-4'>
          <h4 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }} className='mb-4'>
            Guides
          </h4>
          <a href={'https://bootswatch.com/'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            React
          </a>
          <a href={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            React Bootstrap
          </a>
          <a href={'https://bootswatch.com/'} style={{ textDecoration: 'none', color: 'black', display: 'block', textAlign: 'center' }}>
            Bootswatch
          </a>
        </div>
        <div className='contact mb-4' style={{ maxWidth: '400px', width: '100%' }}>
          <h4 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }} className='mb-4'>
            Contact Us
          </h4>
          <div className='d-flex mb-4'>
            <input
              type='text'
              className='form-control text-dark bg-light w-100'
              placeholder='Enter your Email ID'
            />
            <button className='btn btn-success text-light mt-2 mt-md-0 ms-md-2'>Subscribe</button>
          </div>
          <div className='icons d-flex justify-content-evenly'>
            <a href={'https://bootswatch.com/'} style={{ textDecoration: 'none', color: 'black' }}>
              <i className='fab fa-instagram fa-2x'></i>
            </a>
            <a href={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'black' }}>
              <i className='fab fa-facebook fa-2x'></i>
            </a>
            <a href={'https://bootswatch.com/'} style={{ textDecoration: 'none', color: 'black' }}>
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
            <a href={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'black' }}>
              <i className='fab fa-twitter fa-2x'></i>
            </a>
          </div>
        </div>
      </div>
      <br />
      <p style={{ color: 'black', textAlign: 'center' }}>Copyright © 2023 Project Fair. Built With React.</p>
    </div>
  );
}

export default Footer;