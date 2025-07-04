import { useNavigate } from 'react-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

type Inputs = {
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
    } = useForm()


    //Navigating to the login page
    const handleGoToLogin = () => {
        navigate("/signin")
    }

    //Handle the form submission
    const onSubmit= (data) => {
        console.log(data)
    }

    return (
        <main className='main items-center justify-center'>

            {/* Form submission */}
            <form onSubmit={handleSubmit(onSubmit)} className='min-h-[400px] w-[80%] lg:w-[25%] bg-white rounded-md flex flex-col items-center justify-center gap-5 p-5'>
                <h1 className='text-2xl'>Signup</h1>

                {/* Username  */}
                <input type="text" name='username' placeholder='Username' className='input'
                    {...register("username", {
                        required: "username is required"
                    })}
                />
                <p className='w-full text-left text-red-500'>{errors.username && errors.username.message}</p>

                {/* Email */}
                <input type="email" name='email' placeholder='Email' className='input'
                    {...register("email",{
                        required:"Email is required"
                    })}
                />
                <p className='w-full text-left text-red-500'>{errors.email && errors.email.message}</p>


               {/* Password                 */}
                <input type="password" name='password' placeholder='Passsword' className='input'
                    {...register("password",{
                        required:"Password is required"
                    })}
                />
                <p className='w-full text-left text-red-500'>{errors.password && errors.password.message}</p>

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