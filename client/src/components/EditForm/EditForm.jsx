import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const EditForm = () => {
  const [destination, setDestination] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorized } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`https://trippy-server.onrender.com/api/destinations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDestination(data);
      } else {
        console.error("Error fetching destination");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    setDestination((prevdestination) => ({
      ...prevdestination,
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
        } else if (value.length < 10) {
          fieldErrors[fieldName] =
            "Description should be at least 10 characters long";
        }
        break;
      default:
        break;
    }

    return fieldErrors;
  };

  const validateForm = () => {
    const formErrors = {};

    for (const fieldName in destination) {
      const fieldErrors = validateField(fieldName, destination[fieldName]);
      if (Object.keys(fieldErrors).length > 0) {
        formErrors[fieldName] = fieldErrors[fieldName];
      }
    }

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        // Send the form data to the backend API for creating a new destination
        const response = await fetch(`https://trippy-server.onrender.com/api/destinations/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destination),
        });

        if (response.ok) {
          navigate("/");
        } else {
          // Handle error response from the server
          console.error("Error updating destination");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        {errors.title && <p className="error">{errors.title}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={destination.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        <input
          type="text"
          placeholder="ImageUrl"
          value={destination.imageUrl}
          name="imageUrl"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && <p className="error">{errors.description}</p>}
        <input
          type="text"
          placeholder="Description"
          value={destination.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button>Edit</button>
      </form>
    </div>
  );
};

export default EditForm;
