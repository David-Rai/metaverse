import React from 'react'
import { useNavigate } from 'react-router'

const Signin = () => {

    //Handling the login
    const handleLogin = () => {

    }

    return (
        <main className='main items-center justify-center'>
            {/* Form submission */}
            <form className='h-[400px] lg:w-[25%] w-[80%] bg-white rounded-md flex flex-col items-center justify-center gap-5 px-5'>
                <h1 className='text-2xl'>Signin</h1>
                <input type="email" name='email' placeholder='Email' className='input' />
                <input type="password" name='password' placeholder='Passsword' className='input' />
                <button className='btn'>Login</button>
            </form>
        </main>
    )
}

export default Signin