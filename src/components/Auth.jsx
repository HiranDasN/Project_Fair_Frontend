import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import lgnImg from '../Images/log-in-7964202-6381812.webp';
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {

  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const Navigate = useNavigate();
  const registerForm = register ? true : false;

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      toast.warning('Please fill the form completely');
    } else {
      try {
        const result = await registerAPI(userData);
        console.log(result.data);
        if (result.status === 200) {
          toast.success(`${result.data.username} is Successfully Registered`);
          setUserData({
            username: '',
            email: '',
            password: '',
          });
          Navigate('/login');
        } else {
          toast.error(result.response.data);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  const handleLogin = async(e)=>{
    e.preventDefault();
    const{email,password} = userData;
    if(!email || !password){
      toast.warning('please fill the form completely')
    }
    else{
      //api call
     const result =  await loginAPI(userData)
     console.log(result);
     if(result.status === 200){
      //alert
      toast.success('login Successfull');
      setIsAuthToken(true)
      //store the data in session storage
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      //state empty
      setUserData({
        username:"",
        email:"",
        password:""
      })
      //navigate
      setTimeout(()=>{Navigate('/')},2500)
      
     }
     else{
      toast.error(result.response.data)
     }
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex align-items-center justify-content-center'>
        <div className='w-100 container'>
          <Link to={'/'} style={{ textDecoration: 'none', fontSize: 'large', color: 'black' }}>
            <i className="fa-solid fa-arrow-left" style={{ paddingRight: '10px' }}></i>Back to Home
          </Link>
          <div className='card bg-success p-5 rounded' style={{ backgroundColor: 'purple' }}>
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <img src={lgnImg} alt="no" width={'100%'} />
              </div>
              <div className='col-lg-6'>
                <div className='d-flex align-items-center justify-content-center flex-column'>
                  <h1 className='text-light text-center'>
                    <i className="fab fa-stack-overflow fa me-3"></i>Project Fair
                  </h1>
                  <h5 className='text-light mt-4'>{registerForm ? 'Sign Up to your Account' : 'Sign In to your Account'}</h5>
                </div>
                <Form className='mt-5 w-100'>
                  {registerForm && (
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Control
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        value={userData.username}
                        type='text'
                        placeholder='Enter Username'
                      />
                    </Form.Group>
                  )}

                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Control
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      value={userData.email}
                      type='email'
                      placeholder='Enter Email'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Control
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      value={userData.password}
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Group>

                  {registerForm?
                                <div className='d-flex align-items-center flex-column mt-4'>
                                    <button style={{color:'black'}} className='btn btn-warning rounded' onClick={handleRegister}>Register</button>
                                    <p className='mt-2' style={{color:'white'}}>Already A User? Click Here To <Link style={{color:'blue'}} to={'/login'}>Login</Link></p>

                                </div>:
                                <div className='d-flex align-items-center flex-column mt-4'>
                                <button style={{color:'black'}} className='btn btn-warning rounded mt-4' onClick={handleLogin}>Login</button>
                                <p className='mt-2' style={{color:'white'}}>New User? Click Here To <Link style={{color:'blue'}} to={'/register'}>Register</Link></p>

                            </div>
                   }
                </Form>
              </div>
            </div>
          </div>
          <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
        </div>
      </div>
    </>
  );
}

export default Auth;
