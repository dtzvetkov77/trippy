import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import ContactImg from '../../assets/2.jpg'


import React from 'react'

function Contact() {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ContactImg}
    title="Contact"
    btnClass="hide"
    textCName="hero-mid-text"
    />
  </>
  )
}

export default Contact