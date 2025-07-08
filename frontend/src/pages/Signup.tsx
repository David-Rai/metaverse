import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import axios from 'axios'

type Inputs = {
    username: string
    password: string
    email: string
}

//Main components function
const Signup = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    //Verifying if already login
    useEffect(() => {
        async function verify() {
            const result = await axios.get("http://localhost:1111/auth/verify",{
                withCredentials:true
            })
            if(result.data.status){
                navigate(`/dashboard`)
            }
        }

        verify()
    }, [])

    //Navigating to the login page
    const handleGoToLogin = () => {
        navigate("/signin")
    }

    type data = {
        [key: string]: string
    }

    //Handle the form submission
    const onSubmit = async (data: data) => {
        console.log(data)
        const result = await axios.post("http://localhost:1111/auth/signup", {
            name: data.name,
            email: data.email,
            password: data.password
        },
            {
                withCredentials: true
            })

        console.log(result)
        if (result.status === 201) {
            navigate("/dashboard")
        }
    }

    return (
        <main className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-md bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 space-y-6'
        >
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-light text-white'>Create Account</h1>
            <p className='text-gray-400'>Join our community</p>
          </div>
      
          <div className='space-y-4'>
            {/* Username */}
            <div>
              <label htmlFor='username' className='sr-only'>Username</label>
              <input 
                id='username'
                type='text' 
                name='username'
                placeholder='Username'
                className='w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all'
                {...register("name", { required: "Username is required" })}
              />
              {errors.username && (
                <p className='mt-1 text-sm text-red-400'>{errors.username.message}</p>
              )}
            </div>
      
            {/* Email */}
            <div>
              <label htmlFor='email' className='sr-only'>Email</label>
              <input 
                id='email'
                type='email' 
                name='email'
                placeholder='Email'
                className='w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all'
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-400'>{errors.email.message}</p>
              )}
            </div>
      
            {/* Password */}
            <div>
              <label htmlFor='password' className='sr-only'>Password</label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Password'
                className='w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all'
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-400'>{errors.password.message}</p>
              )}
            </div>
          </div>
      
          <button
            type='submit'
            className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800'
          >
            Create Account
          </button>
      
          <div className='text-center text-sm text-gray-400'>
            Already have an account?{' '}
            <button 
              onClick={handleGoToLogin}
              className='text-blue-400 hover:text-blue-300 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
            >
              Login
            </button>
          </div>
        </form>
      </main>
    )
}

export default Signup