import React, { useEffect, useState } from 'react'
import callApi from '../utils/callApi'
import userRoutes from '../routes/user.routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Library() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    ;(async() => {
    
      try {
          const user = await axios.get(userRoutes.getUserCollection, {withCredentials: true})
          console.log(user.status)
          if(user.status !== 200) {
            navigate('/login')
          }
          setUserData(user.data)
          console.log(user)
          
        } catch (error) {
          console.log(error)
        }
    })() 
  }, [])
  
  // console.log(userData)
  return (
    <div className='absolute w-full md:w-[69%] lg:w-[79%] top-20 md:right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto mx-5`}>
      {userData?.length === 0 ?
      <div>{userData}</div> 
      :<div className='text-color'>There is no book in your library...</div> }
      </div>
    </div>
  )
}

export default Library