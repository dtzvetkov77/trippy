import './Search.css'

import React, { useState, useEffect } from "react";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      setDestinations(data);
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
             
              
            </div>
          ))}
          </div>
        </div>
      ) : (
        <p className='empty'>No matching destinations found.</p>
      )}
    </div>
  );
};

export default Search;
