import { useState } from 'react'
import {  useNavigate } from "react-router-dom";


function CreateForm () {
  const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      imageUrl: '',
    });
    const [errors, setErrors] = useState({});

    const handleBlur = (event) => {
      const { name, value } = event.target;
      const formErrors = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: formErrors[name],
      }));
    };
  
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
  
    const validateField = (fieldName, value) => {
      const fieldErrors = {};
  
      switch (fieldName) {
        case "title":
          if (!value.trim()) {
            fieldErrors[fieldName] = "First name is required";
          }
          break;
        case "imageUrl":
          if (!value.trim()) {
            fieldErrors[fieldName] = "Image is required";
          }
          break;
        case "description":
          if (!value) {
            fieldErrors[fieldName] = "Description is required";
          }else if(value.length < 10){
            fieldErrors[fieldName] = "Description should be at least 10 characters long"
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

 
    const fetchDestinations = async () => {
      try {
        await fetch("https://trippy-server.onrender.com/api/destinations")
          .then((response) => response.json())
          .then((data) => setDestinations(data));
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        try {
          // Send the form data to the backend API for creating a new destination
          const response = await fetch("https://trippy-server.onrender.com/api/destinations/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
           
            // Reset form data
            setFormData({
              title: "",
              imageUrl: "",
              description: "",
            });
            navigate('/')
            fetchDestinations();
            setErrors({});
          } else {
            // Handle error response from the server
            console.error("Error creating destination");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setErrors(formErrors);
      }
    };


  return (
    <div className='form-container'>
    <h1>Create</h1>
    <form onSubmit={handleSubmit}>
    {errors.title && <p className='error'>{errors.title}</p>}
    <input
    type='text'
    name='title'
    placeholder='Title' 
    value={formData.title} 
    onChange={handleChange}
    onBlur={handleBlur}
      />
    {errors.imageUrl && <p className='error'>{errors.imageUrl}</p>}
    <input 
    type='text'
    placeholder='ImageUrl'
    value={formData.imageUrl}
    name='imageUrl'
    onChange={handleChange}
    onBlur={handleBlur}
     />
     {errors.description && <p className='error'>{errors.description}</p>}
    <input 
    type='text'
    placeholder='Description'
    value={formData.description}
    name='description'
    onChange={handleChange}
    onBlur={handleBlur}
     />
     
    <button>Create</button>
    </form>
  </div>
  )
}

export default CreateForm
