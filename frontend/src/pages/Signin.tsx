import React from 'react'
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
        <main className='main items-center justify-center'>
            {/* Form submission */}
            <form
                onSubmit={handleSubmit(handleLogin)}
                className='h-[400px] lg:w-[25%] w-[80%] bg-white rounded-md flex flex-col items-center justify-center gap-5 px-5'>
                <h1 className='text-2xl'>Signin</h1>
                <input type="email" name='email' placeholder='Email' className='input'
                    {...register("email", {
                        required: "email is required"
                    })}
                />
                <p className='w-full text-left text-red-500'>{errors.email && errors.email.message}</p>

                <input type="password" name='password' placeholder='Passsword' className='input'
                    {...register("password", {
                        required: "password is required"
                    })}
                />
                <p className='w-full text-left text-red-500'>{errors.password && errors.password.message}</p>

                <button className='btn' type='submit'>Login</button>
            </form>
        </main>
    )
}

export default Signin