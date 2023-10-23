import { useContext, useEffect, useState } from "react";
import "./Trip.css";
import Modal from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const Trip = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const { user, authorized, setAuthorized } = useContext(AuthContext);
  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem("token");
      setAuthorized(!!token);
    };

    checkAuthorization();
  }, [setAuthorized]);

  useEffect(() => {
    const interval = setInterval(() =>  fetchDestinations(),1000);
    return () => clearInterval(interval);
  });


  const fetchDestinations = async () => {
    try {
      await fetch("https://trippy-server.onrender.com/api/destinations")
        .then((response) => response.json())
        .then((data) => setDestinations(data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenModal = (destination) => {
    setSelectedDestination(destination);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://trippy-server.onrender.com/api/destinations/${selectedDestination._id}`, {
        method: "DELETE",
      });
      fetchDestinations();
      setModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps</p>
      {destinations.length > 0 ? (
        <div className="tripcard">
          {destinations.map((destination) => (
            <div key={destination._id} className="t-card">
              <div className="t-image">
                <img src={destination.imageUrl} alt={destination.title} />
              </div>
              <h2>{destination.title}</h2>
              <p>{destination.description}</p>
              
              {authorized ? (
                <div>
                  <button
                  className="details-btn"
                  onClick={() => handleOpenModal(destination)}
                >
                  Details
                </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No destinations available.</p>
      )}

      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          {selectedDestination && (
            <div>
              <h2>{selectedDestination.title}</h2>
              <p>{selectedDestination.description}</p>
              <img
                className="modal-image"
                src={selectedDestination.imageUrl}
                alt=""
              />
              {authorized &&
              user &&
              selectedDestination.owner === user.userId ? (
                <div className="btn-container">
                  <Link to={`/edit/${selectedDestination._id}`}>
                    <button className="edit">Edit</button>
                  </Link>

                  <button onClick={handleDelete} className="delete">
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Trip;
