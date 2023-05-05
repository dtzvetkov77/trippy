import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import imgUrl from '../../assets/hero.jpg'

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
    </>
  )
}

export default Home
