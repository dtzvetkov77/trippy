import { useEffect, useState } from "react";
import "./Trip.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const Trip = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      await fetch("/api/destination")
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
      await fetch(`/api/destination/${selectedDestination._id}`, {
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
              <h2>{destination.title}</h2>
              <p>{destination.description}</p>
              <div className="t-image">
                <img src={destination.imageUrl} alt={destination.title} />
              </div>

              <button
                className="details-btn"
                onClick={() => handleOpenModal(destination)}
              >
                Details
              </button>
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
              <div className="btn-container">
                <button className="edit">Edit</button>
                <button onClick={handleDelete} className="delete">
                  Delete
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Trip;
