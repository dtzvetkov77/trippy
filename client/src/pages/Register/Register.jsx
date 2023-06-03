import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import ContactImg from '../../assets/1.jpg'

const Register = () => {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ContactImg}
    title="Register"
    btnClass="hide"
    textCName="hero-mid-text"
    />
    <RegisterForm/>
    <Footer/>
    </>
      
    
  )
}

export default Register
