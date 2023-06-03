import { Route, Routes } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Service from './pages/Service/Service'
import Contact from './pages/Contact/Contact'
import Register from './pages/Register/Register'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App
