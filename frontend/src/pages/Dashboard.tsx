import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

//Type for the spaces
type spaces = {
  id: number,
  space_id: string,
  space_name: string,
  created_at: string
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [spaces, setSpaces] = useState<spaces[]>([])

  //Verification for dashboard
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:1111/auth/verify",{
          withCredentials:true
        })
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
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:1111/myself", {
        withCredentials: true
      })
      console.log(result)
      if (result) {
        setName(result.data.result[0].name)
        setSpaces(result.data.spaces)
        // console.log(result.data.spaces)
      }
    }

    fetchData()
  }, [])

  return (
    <main className='main'>

      {/* Navigation */}
      <nav className='flex w-full h-[10%] items-center justify-between px-5'>
        <h1 className='text-white capitalize'>{name}</h1>
        <div className='flex gap-5'>
          <button className='btn' onClick={() => navigate('/createspace')} >Create new space</button>
          <button className='btn' onClick={() => navigate("/joinspace")}>Join space</button>
        </div>
      </nav>

      {/* Rooms container */}
      <section className='h-[90%] w-full p-5'>
        <h1 className='text-white'>Active Rooms</h1>
        <div>
          {
            spaces.length > 0 && spaces.map((space, index) => {
              return (
                <div key={index}>
                  {
                    space.space_name
                  }
                </div>
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

export default Dashboard