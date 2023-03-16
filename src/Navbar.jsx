import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        Feature Flicks
      </NavLink>
      <ul>
        <NavLink to="/movies" className="menu">Movies</NavLink>
        <NavLink to="/contact" className="menu">Contact</NavLink>
      </ul>
    </nav>
  )
}