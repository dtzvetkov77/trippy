import "./Navbar.css";
import {Button, ButtonGroup} from "@nextui-org/react";
import {  useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const  {setUser, authorized, setAuthorized} = useContext(AuthContext);

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem("token");
      setAuthorized(!!token);
    };

    checkAuthorization();
  }, [setAuthorized]);


  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthorized(false)
    setUser(null)
    navigate('/login')
  }
  const handleClick = () => setClicked((prevClick) => !prevClick);
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Trippy</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link className="nav-links" to="/">
            <i className="fa-solid fa-house-user"></i>Home
          </Link>
          {authorized 
          ? <Link className="nav-links" to="/create">
            <i className="fa-solid fa-pen-to-square"></i>Create
          </Link>
          : null
        }
          
          <Link className="nav-links" to="/search">
          <i class="fa-solid fa-magnifying-glass"></i>Search
          </Link>
          
            <Link className="nav-links" to="/contact">
              <i className="fa-solid fa-address-book"></i>Contact
            </Link>

        </li>
         
         {authorized 
         ?  <button className="bg-black text-white" onClick={handleLogout}>Logout</button>
         :  <Link to="/register">
            <Button className="bg-black text-white font-semibold rounded-md">Sign Up</Button>
            </Link>
        }          
        
      </ul>
    </nav>
  );
}

export default Navbar;
