import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css'
import axios from "axios";
import { useState } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();


  const [user, setUser] = useState({
    username: '',
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
     axios.post('/api/auth/login', user)
      navigate('/')
  }

  
  return (
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
      <input
      type='text'
      name='username'
      placeholder='Username' 
      value={user.username} 
      onChange={changeHandler}  />
      <input 
      type='text'
      placeholder='Password'
      value={user.password}
      name='password'
      onChange={changeHandler}
       />
      <button>Login</button>
      <p className='login-link'>You don't have an account?<Link style={{textDecoration: 'none', color: 'black'}} to='/register'><span>Register</span></Link></p>
      </form>
    </div>
  )
}

export default LoginForm