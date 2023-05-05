import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import './styles.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Service from './pages/Service/Service'
import Contact from './pages/Contact/Contact'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
        <Navbar/>
      
      
    </div>
  )
}

export default App
