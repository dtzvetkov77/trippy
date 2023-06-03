import "./Navbar.css"
import { MenuItems } from "../MenuItems"
import { useState } from "react"
import { Link } from "react-router-dom"


function Navbar() {

    const [clicked, setClicked] = useState(false)

    const handleClick = () => setClicked(prevClick => !prevClick)

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Trippy</h1>

            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link className={item.cName} to={item.url}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                        </li>
                    )
                })}

                <Link to='/register'>
                  <button>Sign Up</button>
                </Link>
                
                
            </ul>
        </nav>
    )
}

export default Navbar
