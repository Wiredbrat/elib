import React, { useEffect, useState } from 'react'
import userRoutes from '../routes/user.routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function User() {
  const navigate = useNavigate()
  const [ userData, setUserData ] = useState()

  useEffect(() => {
  const user = sessionStorage.getItem('userData')
    if(user) {
      setUserData(user)
    }
    console.log(userData, user)
    ;(async () => {
      try {
        const sessionUser = await axios.get(userRoutes.getUser, {withCredentials: true})

        if(sessionUser.status !== 200) {
          navigate('/login')
          return
        }
        setUserData(sessionUser?.data.data)
        sessionStorage.setItem('userData', sessionUser.data)
        return
      } catch (error) {
        console.log('error', error)
        navigate('/login')
      }
    })()
  
  },[])

  return (
    <div className='absolute w-full md:w-[69%] lg:w-[79%] top-20 md:right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto mx-5`}>
        <div className='flex flex-col md:flex-row items-center gap-6'>
          <div className='w-28 md:w-24 lg:w-32 aspect-auto rounded-full overflow-hidden bg-blue-200'>
            <img src="../../public/avatar/avatar-male.png" alt="" />
          </div>
          <h2 className='text-color font-semibold text-2xl'>{userData?.username}</h2>
        </div>
      </div>
    </div>
  )
}

export default User