import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css'
import { useState } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

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
        // Send login request
        const response = await fetch("https://trippy-server.onrender.com/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // User logged in successfully
          const data = await response.json();
          localStorage.setItem("token", data.token);
          navigate('/')

          // Reset form data
          setFormData({
            email: "",
            password: "",
          });

          setErrors({});
        } else {
          // Handle error response from the server
        
          setAuthError("Wrong email or password");
        }
      } catch (error) {
        // Handle any network or server error
        setAuthError("Wrong email or password");
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
          fieldErrors[fieldName] = "Username is required";
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
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <p className='error'>{authError}</p>
      {errors.username && <p className='error'>{errors.username}</p>}
      <input
      type='text'
      name='username'
      placeholder='Username' 
      value={formData.username} 
      onChange={handleChange}
       onBlur={handleBlur} />
        {errors.username && <p className='error'>{errors.username}</p>}
      <input 
      type='text'
      placeholder='Password'
      value={formData.password}
      name='password'
      onChange={handleChange}
      onBlur={handleBlur}
       />
       
      <button>Login</button>
      <p className='login-link'>You don't have an account?<Link style={{textDecoration: 'none', color: 'black'}} to='/register'><span>Register</span></Link></p>
      </form>
    </div>
  )
}

export default LoginForm