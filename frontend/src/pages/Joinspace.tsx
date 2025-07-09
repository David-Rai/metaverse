import { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../context/Socket.tsx'
import { useNavigate } from 'react-router'
// import { ToastContainer, toast } from 'react-toastify';

export const Joinspace = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  //Socket connection handling
  useEffect(() => {

    socket?.on("joined", (message) => {
      navigate(`/space/${message.space_id}`)
      console.log(message)
    })

    // socket?.on("new-joined",(message)=>{
    //   console.log("some one joined",message)
    // })

  }, [])

  //Handling the joining the space
  const handleSpaceJoin = () => {
    if (inputRef === null) return
    const space_id = inputRef.current && inputRef.current.value
    console.log(space_id)

    //sending to the socket server
    socket?.emit("join-space", { space_id })

  }

  return (
    <main className="main min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-600 rounded-full filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-600 rounded-full filter blur-3xl opacity-10 animate-float-delay"></div>
    </div>
  
    {/* Content container */}
    <div className="text-center w-full max-w-md relative z-10 animate-fadeIn">
      <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
          Join a Space
        </span>
      </h1>
      
      <div className="w-full bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col gap-6 items-center border border-gray-700 hover:border-emerald-400/30 transition-all duration-500">
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter space ID"
            className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
          />
          <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <button
          className="w-full relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-lg group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          onClick={handleSpaceJoin}
        >
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600"></span>
          <span className="absolute rounded-lg inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
          <span className="relative z-10 text-white font-semibold text-lg group-hover:text-emerald-100 transition-colors duration-300">
            Join Space
            <svg className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute -bottom-0 -right-0 w-full h-10 bg-white opacity-10 filter blur-lg group-hover:w-0 group-hover:opacity-0 transition-all duration-500"></span>
        </button>
        
        <p className="text-gray-400 text-sm mt-2">
          Don't have an ID? <span onClick={()=> navigate("/createspace")} className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors">Create a space</span>
        </p>
      </div>
    </div>
  
    {/* Floating particles */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-emerald-400 opacity-10"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
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