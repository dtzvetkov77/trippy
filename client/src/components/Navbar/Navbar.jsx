import "./Navbar.css";
import { MenuItems } from "../MenuItems";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);

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
          <Link className="nav-links" to="/about">
            <i className="fa-solid fa-circle-info"></i>About
          </Link>
          <Link className="nav-links" to="/service">
            <i className="fa-solid fa-briefcase"></i>Service
          </Link>
          {user ? (
            <Link className="nav-links" to="/contact">
              <i className="fa-solid fa-address-book"></i>Contact
            </Link>
          ) : null}
        </li>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
