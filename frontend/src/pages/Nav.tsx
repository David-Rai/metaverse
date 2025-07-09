import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes, FaUserPlus, FaSignInAlt } from 'react-icons/fa'

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className='h-20 text-white w-full bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-800 flex items-center px-5 justify-between fixed top-0 left-0 z-50'>
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-bold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
          Metaverse
        </span>
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink 
          to="/signup" 
          className={({ isActive }) => 
            `relative px-4 py-2 font-medium flex items-center gap-2 capitalize transition-all duration-300 group ${
              isActive ? 'text-purple-300' : 'text-gray-300 hover:text-white'
            }`
          }
        >
          <FaUserPlus />
          Sign Up
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        <NavLink 
          to="/signin" 
          className={({ isActive }) => 
            `relative px-4 py-2 font-medium flex items-center gap-2 capitalize transition-all duration-300 group ${
              isActive ? 'text-blue-300' : 'text-gray-300 hover:text-white'
            }`
          }
        >
          <FaSignInAlt />
          Sign In
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        <button
          onClick={() => navigate("/joinspace")}
          className="ml-4 relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all rounded-lg group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"></span>
          <span className="absolute rounded-lg inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
          <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
            Join Now
          </span>
        </button>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden z-50">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-900 border-t border-gray-700 flex flex-col gap-4 p-6 z-40 md:hidden">
          <NavLink 
            to="/signup" 
            className="flex items-center gap-2 text-gray-300 hover:text-white" 
            onClick={() => setMenuOpen(false)}
          >
            <FaUserPlus />
            Sign Up
          </NavLink>

          <NavLink 
            to="/signin" 
            className="flex items-center gap-2 text-gray-300 hover:text-white" 
            onClick={() => setMenuOpen(false)}
          >
            <FaSignInAlt />
            Sign In
          </NavLink>

          <button
            onClick={() => {
              navigate("/joinspace")
              setMenuOpen(false)
            }}
            className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
          >
            Join Now
          </button>
        </div>
      )}
    </nav>
  )
}

export default Nav
