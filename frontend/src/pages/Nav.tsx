import React from 'react'
import { NavLink } from 'react-router'

export const Nav = () => {
    return (
        <>
            {/* NavBar */}
            < nav className='h-[80px] text-white w-full bg-[#333A64] flex items-center px-5 justify-between'> 
                <h1 className="logo text-2xl">Metaverse</h1>
                <div className="right flex gap-5 capitalize">
                    <NavLink to="/signup">signup</NavLink>
                    <NavLink to="/signin">Signin</NavLink>
                </div>
            </nav>
        </>

    )
}
