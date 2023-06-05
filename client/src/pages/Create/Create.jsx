import ContactImg from '../../assets/1.jpg'
import CreateForm from '../../components/CreateForm/CreateForm'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'


const Create = () => {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ContactImg}
    title="Create"
    btnClass="hide"
    textCName="hero-mid-text"
    />
    <CreateForm/>
    <Footer/>
    </>
  )
}

export default Create
