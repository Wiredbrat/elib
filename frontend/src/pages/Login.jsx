import React from 'react'
import { LoginRegisterForm } from '../Importer'

function Login() {
  return (
    <>
      <div className='w-full h-screen flex justify-center px-5 lg:justify-between items-center gap-5'>
        <div className='w-0 lg:w-[65%] h-screen flex items-center overflow-hidden'>
          <div className='h-[95vh] w-full bg-linear-to-br from-purple-500 to-red-400 rounded-2xl'>

          </div>
        </div>
        <div className='w-full sm:w-[50%] lg:w-[35%] h-screen flex items-center justify-center'>
          <div className='w-full lg:w-[80%] '>
            <LoginRegisterForm/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login