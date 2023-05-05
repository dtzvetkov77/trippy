import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import ServiceImg from '../../assets/night.jpg'

import React from 'react'

function Service() {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ServiceImg}
    title="Service"
    btnClass="hide"
    textCName="hero-mid-text"
    />
  </>
  )
}

export default Service
