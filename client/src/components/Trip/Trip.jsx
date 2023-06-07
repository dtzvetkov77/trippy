import { useEffect, useState } from 'react';
import './Trip.css'

const Trip = () => {
const [destinations, setDestinations] = useState([]);

useEffect(()=> {
  fetch('/api/destination')
  .then((response) => response.json())
  .then((data) => setDestinations(data))
  .catch((err) => console.log(err))
}, []);


  return (
    <div className='trip'>
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps</p>
      <div className='tripcard'>
      {destinations.map((destination) => (
          <div key={destination._id} className="t-card">
            <h2>{destination.title}</h2>
            <p>{destination.description}</p>
            <div className='t-image'>
            <img src={destination.imageUrl} alt={destination.title} />
            </div>
          </div>
        ))}
      </div>  
    </div>
  )
}

export default Trip
