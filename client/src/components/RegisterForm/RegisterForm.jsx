import { useState, useContext } from 'react'
import './RegisterForm.css'
import {  useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';


const RegisterForm = () => {
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  })

 
  
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate the field as the user types
    const formErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: formErrors[name],
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const formErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: formErrors[name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        // Save user in MongoDB
        const response = await fetch("https://trippy-server.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
         
          // Reset form data
          setFormData({
            username: "",
            email: "",
            password: "",
          });
          navigate('/login')
          setErrors({});
        } else {
          // Handle error response from the server
          console.error("Error registering user");
        }
      } catch (error) {
        // Handle any network or server error
        console.error("Error registering user", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const validateField = (fieldName, value) => {
    const fieldErrors = {};

    switch (fieldName) {
      case "username":
        if (!value.trim()) {
          fieldErrors[fieldName] = "First name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          fieldErrors[fieldName] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors[fieldName] = "Invalid email address";
        }
        break;
      case "password":
        if (!value) {
          fieldErrors[fieldName] = "Password is required";
        } else if (value.length < 6) {
          fieldErrors[fieldName] = "Password must be at least 6 characters long";
        }
        break;
      default:
        break;
    }

    return fieldErrors;
  };

  const validateForm = () => {
    const formErrors = {};

    for (const fieldName in formData) {
      const fieldErrors = validateField(fieldName, formData[fieldName]);
      if (Object.keys(fieldErrors).length > 0) {
        formErrors[fieldName] = fieldErrors[fieldName];
      }
    }

    return formErrors;
  };
  
  return (
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}> 
      {errors.username && <p className='error'>{errors.username}</p>}
      <input
      type='text'
      name='username'
      placeholder='Username' 
      value={formData.username} 
      onChange={handleChange}
      onBlur={handleBlur}  />
     
        
     {errors.email && <p className='error'>{errors.email}</p>}
      <input 
      type='text'
      placeholder='Email'
      value={formData.email}
      name='email'
      onChange={handleChange}
      onBlur={handleBlur}
       />
       {errors.password && <p className='error'>{errors.password}</p>}
      <input 
      type='text'
      placeholder='Password'
      value={formData.password}
      name='password'
      onChange={handleChange}
      onBlur={handleBlur}
       />
       
      <button className='bg-black text-white'>Register</button>
      <p className='login-link'>You have an account?<Link style={{textDecoration: 'none', color: 'black'}} to='/login'><span>Log in</span></Link></p>
      </form>
    </div>
  )
}

export default RegisterForm
