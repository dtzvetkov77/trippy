import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Service from './pages/Service/Service'
import Contact from './pages/Contact/Contact'
import Register from './pages/Register/Register'
import { AuthContext } from './Context/AuthContext'
import { useState } from 'react'
import Login from './pages/Login/Login'



function App() {
  const [auth, setAuth] = useState({})
  const navigate = useNavigate();
  const userRegister = (authData) => {
    setAuth(authData)
  }

  const handleLogout = () => {
    setAuth(null);
    navigate('/login')
  }
  return (
    <AuthContext.Provider value={{user: auth, userRegister, handleLogout}}>
       <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/contact' element={auth ? <Contact/> : <Navigate to="/login"/> } />
        <Route path='/register' element={auth ? <Navigate to="/"/> : <Register/>}/>
        <Route path='/login' element={auth ? <Navigate to="/"/> : <Login/>}/>
      </Routes>
    </div>
    </AuthContext.Provider>
  )
}

export default App
