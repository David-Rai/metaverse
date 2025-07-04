import { useNavigate } from 'react-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

type Inputs = {
    example: string
    exampleRequired: string
    username: string
    password: string
    email: string
}

const Signup = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()


    //Navigating to the login page
    const handleGoToLogin = () => {
        navigate("/signin")
    }

    //Handle the form submission
    const onSubmit = (data: Inputs) => {
        console.log(data)
    }

    return (
        <main className='main items-center justify-center'>

            {/* Form submission */}
            <form onSubmit={handleSubmit(onSubmit)} className='h-[400px] w-[25%] bg-white rounded-md flex flex-col items-center justify-center gap-5 px-5'>
                <h1 className='text-2xl'>Signup</h1>
                <input type="text" name='username' placeholder='Username' className='input'
                    {...register("username")}
                />
                <input type="email" name='email' placeholder='Email' className='input' 
                {...register("email")}
                />
                <input type="password" name='password' placeholder='Passsword' className='input'
                {...register("password")}
                />
                <button className='btn' type='submit'>Create account</button>
                <div>
                    Already have account?
                    <button className='text-blue-600 mx-3' onClick={handleGoToLogin}>Login</button>
                </div>
            </form>
        </main>
    )
}

export default Signup