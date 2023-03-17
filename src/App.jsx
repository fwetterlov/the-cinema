import Navbar from './Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import './styles.css'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </>
  )
}

export default App
