import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import AboutImg from '../../assets/night.jpg'

function About() {
  return (
    <>
      <Navbar/>
      <Hero 
      cName="hero-mid"
      heroImg={AboutImg}
      title="About"
      btnClass="hide"
      textCName="hero-mid-text"
      />
    </>
  )
}

export default About
