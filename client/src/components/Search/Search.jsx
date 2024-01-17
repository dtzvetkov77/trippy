import './Search.css'

import React, { useState, useEffect, useContext } from "react";
import "./Search.css";
import { AuthContext } from '../../Context/AuthContext';
import { Modal,   ModalContent,   ModalHeader, Button,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const { user, authorized, setAuthorized } = useContext(AuthContext);
  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem("token");
      setAuthorized(!!token);
    };

    checkAuthorization();
  }, [setAuthorized]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleOpenModal = (destination) => {
    setSelectedDestination(destination);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    onOpenChange(false);
  };

  const fetchDestinations = async () => {
    try {
      const response = await fetch("https://trippy-server.onrender.com/api/destinations");
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error(error);
    }
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter destinations based on the search query
    const filtered = destinations.filter((destination) =>
      destination.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  return (
    <>
    <div className="search-container"> 
    <h2>Matching Destinations</h2>
      <input
        type="text"
        placeholder="Search destinations by title"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredDestinations.length > 0 ? (
        <div className="matching-destinations">
         
          <div className='card-container'>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
              <div className="image-container">

                 <img src={destination.imageUrl} alt={destination.title} />
              </div>

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
        </div>
      ) : (
        <p className='empty'>No matching destinations found.</p>
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

export default Search;
