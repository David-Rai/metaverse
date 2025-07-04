import { useNavigate } from 'react-router'
import React from 'react'

const Signup = () => {
const navigate=useNavigate()

    //Navigating to the login page
    const handleGoToLogin=()=>{
  navigate("/signin")
    }

    return (
        <main className='main items-center justify-center'>

            {/* Form submission */}
            <form className='h-[400px] w-[25%] bg-white rounded-md flex flex-col items-center justify-center gap-5 px-5'>
                 <h1 className='text-2xl'>Signup</h1>
                <input type="text" name='username' placeholder='Username' className='input' />
                <input type="email" name='email' placeholder='Email' className='input' />
                <input type="password" name='password' placeholder='Passsword' className='input'/>
                <button className='btn'>Create account</button>
                <div>
                    Already have account?
                   <button className='text-blue-600 mx-3' onClick={handleGoToLogin}>Login</button>
                </div>
            </form>
        </main>
    )
}

export default Signup