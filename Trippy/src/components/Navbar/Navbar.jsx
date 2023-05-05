import "./Navbar.css"
import { MenuItems } from "./MenuItems"
import { useState } from "react"


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
                            <a className={item.cName} href={item.url}>
                                <i className={item.icon}></i>{item.title}
                            </a>
                        </li>
                    )
                })}
                <button>Sign Up</button>
            </ul>
        </nav>
    )
}

export default Navbar
