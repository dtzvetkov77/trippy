import DestinationData from "../DestinationData"
import './Destination.css'
import Mountain1 from "../../assets/1.jpg"
import Mountain2 from "../../assets/2.jpg"
import Mountain3 from '../../assets/5.jpg'
import Mountain4 from '../../assets/8.jpg'

const Destination = () => {
  return (
    <div className="destination">
      <h1>Popular Destinations</h1>
      <p>Tours give you the opportunity to see a lot, whitin a timeframe</p>

        <DestinationData
        className="first-des"
        heading="Taal Volcano, Batangas"
        text="Taal Volcano is a large caldera filled by Taal Lake in the Philippines. Located in the province of Batangas, the volcano is second of the most active volcanoes in the country, with 38 recorded historical eruptions, all of which were concentrated on Volcano Island, near the middle of Taal Lake."
        img1={Mountain1}
        img2={Mountain2}
        />

        <DestinationData
        className="first-des-reverse"
        heading="Mt. Daguldul, Batanagas"
        text="Mt. Daguldol is a coastal mountain located in the province of Batangas. It offers a scenic view of nearby Batangas mountains and beaches. Additionally, Mt. Daguldol has an elevation of 672 MASL or 2204 feet. Mt. Daguldol is exactly situated in Sitio Biga, Barangay, Hugom San Juan, Batangas. It is bound between the municipality of San Juan and Lobo. The Lobo municipality is also a highlands, with Mt. Naguiling being the tallest mountain."
        img1={Mountain3}
        img2={Mountain4}
        />
     
    </div>

   
  );
};

export default Destination;
