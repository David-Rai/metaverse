import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import type { SubmitHandler } from 'react-hook-form'

const Signin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //Type notation for data

  type data = {
    [key: string]: string
  }

  //Verifying if already login
  useEffect(() => {
    async function verify() {
      const result = await axios.get("http://localhost:1111/auth/verify", {
        withCredentials: true
      })
      if (result.data.status) {
        navigate(`/dashboard`)
      }
    }

    verify()
  }, [])

  //Handling the login
  const handleLogin = async (data: data) => {
    // console.log(data)
    const result = await axios.post("http://localhost:1111/auth/signin", {
      email: data.email,
      password: data.password
    },
      {
        withCredentials: true
      })
    console.log(result.data)

    if (result.data.status === 200) {
      navigate(`/dashboard`)
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='w-full max-w-md bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 space-y-6'
      >
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-light text-white'>Sign In</h1>
          <p className='text-gray-400'>Enter your credentials to continue</p>
        </div>

        <div className='space-y-4'>
          <div>
            <label htmlFor='email' className='sr-only'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='Email'
              className='w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all'
              {...register("email", { required: "Email is required" })}
            />
            {errors.email?.message && typeof errors.email.message === 'string' && (
              <p className='mt-1 text-sm text-red-400'>{errors.email.message}</p>
            )}

          </div>

          <div>
            <label htmlFor='password' className='sr-only'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              className='w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all'
              {...register("password", { required: "Password is required" })}
            />
            {errors.password?.message && typeof errors.password.message === 'string' && (
              <p className='mt-1 text-sm text-red-400'>{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800'
        >
          Continue
        </button>

        <div className='text-center text-sm text-gray-400'>
          Don't have an account?{' '}
          <a href='/signup' onClick={() => navigate('/signup')} className='text-blue-400 hover:text-blue-300 hover:underline transition-colors'>
            Sign up
          </a>
        </div>
      </form>
    </main>
  )
}

export default Signin