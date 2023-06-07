import { useState } from 'react'
import {  useNavigate } from "react-router-dom";


const CreateForm = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      imageUrl: '',
    });
    const [errors, setErrors] = useState({});

   
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    };
  
    const validateForm = () => {
      const formErrors = {};
  
      if (!formData.title.trim()) {
        formErrors.title = 'Title is required';
      }
  
      if (!formData.description.trim()) {
        formErrors.description = 'Description is required';
      }
  
      if (!formData.imageUrl.trim()) {
        formErrors.imageUrl = 'Image URL is required';
      }
  
      return formErrors;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        try {
          // Send the form data to the backend API for creating a new destination
          const response = await fetch("/api/destination/create", {
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
    <input
    type='text'
    name='title'
    placeholder='Title' 
    value={formData.title} 
    onChange={handleChange}
      />
      {errors.imageUrl && <p className='error'>{errors.imageUrl}</p>}
    <input 
    type='text'
    placeholder='ImageUrl'
    value={formData.imageUrl}
    name='imageUrl'
    onChange={handleChange}
     />
    <input 
    type='text'
    placeholder='Description'
    value={formData.description}
    name='description'
    onChange={handleChange}
     />
     
    <button>Create</button>
    </form>
  </div>
  )
}

export default CreateForm
