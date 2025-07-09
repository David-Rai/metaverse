// import React from 'react'
import  Nav  from './Nav.tsx'
import { useNavigate } from 'react-router'


const Home = () => {
  const navigate = useNavigate()

  //Navigating to the signup and signin page
  const handleStart = () => {
    navigate('/signup')
  }

  return (
    <main className="main min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-float"></div>
    <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
    <div className="absolute top-2/3 left-1/3 w-60 h-60 bg-blue-600 rounded-full filter blur-3xl opacity-15 animate-float"></div>
  </div>

  {/* NavBar */}
  <Nav />

  {/* Main content */}
  <div className="flex-1 flex flex-col items-center justify-center w-full text-white px-6 text-center relative z-10">
    <div className="max-w-4xl space-y-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
        {/* <span className="block mb-4 animate-fadeIn">Connect, Communicate, and Play —</span> */}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300 animate-fadeIn delay-100">
          Experience the Future of Social Interaction
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn delay-200">
        Step into a new dimension of digital connection where boundaries disappear and possibilities are endless.
      </p>
      
      <div className="animate-fadeIn delay-300">
        <button
          className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all rounded-xl group"
          onClick={handleStart}
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600"></span>
          <span className="absolute rounded-xl inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
          <span className="relative z-10 text-lg font-semibold text-white group-hover:text-indigo-100 transition-colors duration-300">
            🚀 Get Started
            <svg className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute -bottom-0 -right-0 w-full h-10 bg-white opacity-10 filter blur-lg group-hover:w-0 group-hover:opacity-0 transition-all duration-500"></span>
        </button>
      </div>
    </div>
  </div>

  {/* Floating particles */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white opacity-5"
        style={{
          width: `${Math.random() * 8 + 2}px`,
          height: `${Math.random() * 8 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 15 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>
</main>

  )
}

export default Home