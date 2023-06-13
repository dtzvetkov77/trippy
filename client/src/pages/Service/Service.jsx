import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import ServiceImg from '../../assets/night.jpg'

import React from 'react'
import Footer from "../../components/Footer/Footer"
import Search from "../../components/Search/Search"

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
    <Search/>
    <Footer/>
  </>
  )
}

export default Service
