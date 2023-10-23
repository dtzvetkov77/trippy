import { Route, Routes, Navigate } from "react-router-dom";
import "./styles.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Create from "./pages/Create/Create";
import jwt_decode from "jwt-decode";
import { AuthContext } from "./Context/AuthContext";
import { useEffect, useState } from "react";
import Edit from "./pages/Edit/Edit";
import SearchPage from "./pages/Service/SearchPage";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  const checkTokenExpiration = (token) => {
    // Decode the token to extract the expiration time
    const decodedToken = jwt_decode(token);

    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    // Get the current time
    const currentTime = Date.now();

    // Check if the token has expired
    return currentTime > expirationTime;
  };

  useEffect(() => {
    const isAuthorized = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };

    const token = localStorage.getItem("token");

    const isTokenValid = token ? !checkTokenExpiration(token) : false;

    if (isTokenValid) {
      setAuthorized(isAuthorized());
      const decodedToken = jwt_decode(token);

      setUser(decodedToken);
    } else {
      setAuthorized(false);
      setUser(null);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized, user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<SearchPage />} />
          <Route
            path="/create"
            element={authorized ? <Create /> : <Navigate to="/login" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/register"
            element={authorized ? <Navigate to="/login" /> : <Register />}
          />
          <Route
            path="/login"
            element={authorized ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/create"
            element={authorized ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={authorized ? <Edit /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
