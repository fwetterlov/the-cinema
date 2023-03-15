import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        <img src="./img/logo.png" className="site-logo" alt="Logo" />
        Feature Flicks
      </NavLink>
      <ul>
        <NavLink to="/movies" className="menu">Movies</NavLink>
        <NavLink to="/contact" className="menu">Contact</NavLink>
      </ul>
    </nav>
  )
}