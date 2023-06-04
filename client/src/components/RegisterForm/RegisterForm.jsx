import { useState, useContext } from 'react'
import './RegisterForm.css'
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
    const navigate = useNavigate();

    const { userRegister } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: '',
    email:'',
    password: '',
  })
  const changeHandler = (e) => {
      setUser((state) => ({
        ...state,
        [e.target.name]: e.target.value
      }))
  }


  const submitHandler = async (e) => {
      e.preventDefault();
     axios.post('/api/auth/register', user)
     userRegister(user)
      navigate('/login')
  }

  
  return (
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
      <input
      type='text'
      name='username'
      placeholder='Username' 
      value={user.username} 
      onChange={changeHandler}  />
      <input 
      type='email'
      placeholder='Email'
      value={user.email}
      name='email'
      onChange={changeHandler}
       />
      <input 
      type='text'
      placeholder='Password'
      value={user.password}
      name='password'
      onChange={changeHandler}
       />
       
      <button>Register</button>
      <p className='login-link'>You have an account?<Link style={{textDecoration: 'none', color: 'black'}} to='/login'><span>Log in</span></Link></p>
      </form>
    </div>
  )
}

export default RegisterForm
