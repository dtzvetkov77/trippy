import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import ContactImg from '../../assets/1.jpg'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ContactImg}
    title="Login"
    btnClass="hide"
    textCName="hero-mid-text"
    />
    <LoginForm/>
    <Footer/>
    </>
      
    
  )
}

export default Login