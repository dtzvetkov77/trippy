import { Route, Routes, Navigate } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Service from './pages/Service/Service'
import Contact from './pages/Contact/Contact'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Create from './pages/Create/Create'

import { AuthContext } from './Context/AuthContext'


function App() {
  const isAuthorized = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

    const authorized = isAuthorized();

  return (
    <AuthContext.Provider value={{isAuthorized}}>
       <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/create' element={authorized ? <Create/> : <Navigate to="/login"/> }  />
        <Route path='/contact' element={authorized ? <Contact/> : <Navigate to="/login"/> } />
        <Route path='/register' element={authorized ? <Navigate to="/login"/> : <Register/>}/>
        <Route path='/login' element={authorized ? <Navigate to="/"/> : <Login/>}/>
        <Route path='/create' element={authorized ? <Create/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
    </AuthContext.Provider>
  )
}

export default App
