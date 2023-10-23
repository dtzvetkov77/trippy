import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import ServiceImg from '../../assets/night.jpg'

import React from 'react'
import Footer from "../../components/Footer/Footer"
import Search from "../../components/Search/Search"

function Search() {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero-mid"
    heroImg={ServiceImg}
    title="Search"
    btnClass="hide"
    textCName="hero-mid-text"
    />
    <Search/>
    <Footer/>
  </>
  )
}

export default Search
