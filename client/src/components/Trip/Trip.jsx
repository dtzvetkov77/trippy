import { useContext, useEffect, useState } from "react";
import {  Image, Modal,   ModalContent,   ModalHeader, Button,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import './Trip.css'


const Trip = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    onOpenChange(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://trippy-server.onrender.com/api/destinations/${selectedDestination._id}`, {
        method: "DELETE",
      });
      fetchDestinations();
      onOpenChange(false)
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
  <> 
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps</p>
      {destinations.length > 0 ? (
        <div className="tripcard">
          {destinations.map((destination) => (
            <div key={destination._id} className="t-card">
              <div className="t-image">
                <img className="object-cover" src={destination.imageUrl} alt={destination.title} />
              </div>
              <h2 className="mt-3 text-xl">{destination.title}</h2>
              <p>{destination.description}</p>
              
              {authorized ? (
                <div>
                  <Button variant="solid" className="font-normal bg-black text-white" onPress={() => handleOpenModal(destination)}>
                    Details
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No destinations available.</p>
      )}
      
    </div>

    <Modal hideCloseButton={true} className="max-w-[600px]" backdrop="blur" isOpen={isOpen} onClose={handleCloseModal} placement='auto' size="md">
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1"> <h2 className="m-3">{selectedDestination?.title}</h2> </ModalHeader>
      <ModalBody className="flex flex-row ">
          
            {selectedDestination && <Image width={200} height={100} className="object-cover" src={selectedDestination.imageUrl} alt={selectedDestination.title} />}      
          <p>{selectedDestination?.description}</p>
      </ModalBody>
      <ModalFooter>
        {authorized && user && selectedDestination?.owner === user.userId && (
          <>
            <Link to={`/edit/${selectedDestination?._id}`}>
              <Button className="bg-black text-white" flat auto>
                Edit
              </Button>
            </Link>
            <Button color="danger" className="hover:bg-red-500" onPress={handleDelete}>
              Delete
            </Button>
          </>
        )}

      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  );
};

export default Trip;
