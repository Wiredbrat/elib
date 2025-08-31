import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex flex-col justify-center gap-2 items-center h-screen'>
      <div className='text-color text-2xl'>404 </div>
      <div className='text-color text-2xl font-bold'> Page Not Found</div>
      <Link to='/discover' className='text-color-alt underline '> Back to Home</Link>
    </div>
  )
}

export default NotFound