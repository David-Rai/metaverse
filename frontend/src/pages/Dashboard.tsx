import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { SocketContext } from '../context/Socket'
import { useContext } from 'react'

//Type for the spaces
type spaces = {
  id: number,
  space_id: string,
  space_name: string,
  created_at: string
}

const Dashboard = () => {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [spaces, setSpaces] = useState<spaces[]>([])


  //Socket handing
  useEffect(() => {
    socket?.on("delete-success", () => {
      fetchData()
    })
  }, [])

  //Verification for dashboard
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("https://metaverse-ckv5.onrender.com/auth/verify", {
          withCredentials: true
        })
        console.log(res)
      }
      catch (err) {
        if (err) {
          navigate('/signup')
          console.log("error xa hai ta signup garum la")
        }
      }
    }

    verify()
  }, [])

  //Setting up the Usersdata
  const fetchData = async () => {
    const result = await axios("https://metaverse-ckv5.onrender.com/myself", {
      withCredentials: true
    })
    console.log(result)
    if (result) {
      setName(result.data.result[0].name)
      setSpaces(result.data.spaces)
      // console.log(result.data.spaces)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //Deleting the space
  const handleDeleteSpace = (space_id: string) => {
    socket?.emit("delete-space", { space_id })
  }

  return (
    <main className="main min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      {/* Navigation */}
      <nav className="flex w-full h-[10vh] items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md z-10">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 text-xl md:text-2xl font-bold tracking-tight">
          {name}
        </h1>
        <div className="flex gap-4">
          <button
            className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all rounded-lg group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            onClick={() => navigate('/createspace')}
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600"></span>
            <span className="absolute rounded-lg inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
            <span className="relative z-10 text-white text-sm md:text-base group-hover:text-blue-100 transition-colors duration-300">
              Create New Space
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all rounded-lg group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            onClick={() => navigate('/joinspace')}
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600"></span>
            <span className="absolute rounded-lg inset-0.5 bg-gray-900 group-hover:bg-opacity-80 transition-all duration-300"></span>
            <span className="relative z-10 text-white text-sm md:text-base group-hover:text-green-100 transition-colors duration-300">
              Join Space
            </span>
          </button>
        </div>
      </nav>

      {/* Rooms container */}
      <section className="h-[90vh] w-full px-6 py-8 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
            Active Rooms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {spaces.length > 0 ? (
              spaces.map((space, index) => (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-lg font-semibold text-white truncate relative z-10">
                    {space.space_name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 relative z-10">ID: {space.space_id}</p>
                  <div className="mt-6 relative z-10">
                    <button
                      onClick={() => navigate(`/space/${space.space_id}`)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Enter Space
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteSpace(space.space_id)}
                      className="mt-5 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Delete Space
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-24 h-24 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No active rooms found</h3>
                <p className="text-gray-500 max-w-md">Create a new space or join an existing one to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

export default Dashboard