import { useState } from 'react'
import './RegisterForm.css'


const RegisterForm = () => {
  const [state, setState] = useState({
    username: '',
    email:'',
    password: '',
  })
  const changeHandler = (e) => {
      setState((state) => ({
        ...state,
        [e.target.name]: e.target.value
      }))
  }

  const submitHandler = (e) => {
      e.preventDefault();
      console.log(state)
  }

  console.log(state)
  return (
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
      <input
      type='text'
      name='username'
      placeholder='Username' 
      value={state.username} 
      onChange={changeHandler}  />
      <input 
      type='email'
      placeholder='Email'
      value={state.email}
      name='email'
      onChange={changeHandler}
       />
      <input 
      type='text'
      placeholder='Password'
      value={state.password}
      name='password'
      onChange={changeHandler}
       />
      <button>Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
