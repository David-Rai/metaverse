import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../context/Socket.tsx'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

const Createspace = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()


  //Socket connection handling
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connected to server")
      toast.success("connnection established")
    })


    //Getting the spaceID
    socket.on("space-created", (message) => {
      console.log("from server", message)
      toast.success("successfully space created")
      navigate(`/space/${message.space_id}`)
    })
  }, [])

  //Creating the space
  const handleCreateSpace = () => {
    if (inputRef.current === null) return

    if (inputRef.current.value) {
      const space_name = inputRef.current && inputRef.current.value
      console.log(space_name)

      //sending to the socket server
      socket?.emit("space-create", { space_name })

    }

  }

  return (
    <main className="main flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      {/* Content container */}
      <div className="text-center w-full max-w-md relative z-10 animate-fadeIn">
        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
            Create a New Space
          </span>
        </h1>

        <div className="w-full bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col gap-6 items-center border border-gray-700 hover:border-blue-400/30 transition-all duration-500">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Name your space..."
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              ref={inputRef}
            />
            <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>

          <button
            className="w-full relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-lg group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            onClick={handleCreateSpace}
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600"></span>
            <span className="absolute rounded-lg inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
            <span className="relative z-10 text-white font-semibold text-lg group-hover:text-blue-100 transition-colors duration-300">
              Create Space
              <svg className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="absolute -bottom-0 -right-0 w-full h-10 bg-white opacity-10 filter blur-lg group-hover:w-0 group-hover:opacity-0 transition-all duration-500"></span>
          </button>

          <p className="text-gray-400 text-sm mt-2">
            Already have a space? <span onClick={() => navigate("/joinspace")} className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Join existing space</span>
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-10"
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

export default Createspace