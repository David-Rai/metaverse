import React from 'react'

export const Joinspace = () => {

  
  return (
    <main className='main items-center justify-center'>
      <h1 className='text-white m-5'>Joining the space</h1>
      <div className='w-[20%] h-[200px] bg-white rounded-md flex flex-col p-5 items-center justify-center gap-6'>
        <input type="text" placeholder='Space id' className='input' />
        <button className='btn'>Join Space</button>
      </div>
    </main>
  )
}