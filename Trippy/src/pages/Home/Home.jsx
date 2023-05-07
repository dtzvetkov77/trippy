import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import imgUrl from '../../assets/hero.jpg'
import Destination from "../../components/Destination/Destination"
import Trip from "../../components/Trip/Trip"

function Home() {
  return (
    <>
      <Navbar/>
      <Hero 
      cName="hero"
      heroImg={imgUrl}
      title="Your Journey Your Story"
      text="Choose Your Favorite Destination"
      buttonText="Travel Plan"
      url="/"
      btnClass="show"
      textCName="hero-text"
      />
      <Destination/>
      <Trip/>
    </>
  )
}

export default Home
