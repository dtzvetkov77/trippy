import { useState, useContext } from 'react'
import {  useNavigate } from "react-router-dom";

import axios from "axios";


const CreateForm = () => {
    const navigate = useNavigate();

  const [destination, setDestination] = useState({
    title: '',
    imageUrl:'',
    description: '',
  })
  const changeHandler = (e) => {
      setDestination((state) => ({
        ...state,
        [e.target.name]: e.target.value
      }))
  }


  const submitHandler = async (e) => {
      e.preventDefault();
     

      navigate('/')
  }
  return (
    <div className='form-container'>
    <h1>Create</h1>
    <form onSubmit={submitHandler}>
    <input
    type='text'
    name='title'
    placeholder='Title' 
    value={destination.title} 
    onChange={changeHandler}  />
    <input 
    type='text'
    placeholder='ImageUrl'
    value={destination.imageUrl}
    name='imageUrl'
    onChange={changeHandler}
     />
    <input 
    type='text'
    placeholder='Description'
    value={destination.description}
    name='description'
    onChange={changeHandler}
     />
     
    <button>Create</button>
    </form>
  </div>
  )
}

export default CreateForm
