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
          const user = await axios.get(userRoutes.getUser, {withCredentials: true})
          console.log(user.status)
          if(user.status !== 200) {
            navigate('/login')
          }
          setUserData(user)
          console.log(userData)
        
      } catch (error) {
        
      }
  })() 
  }, [])
  return (
    <div></div>
  )
}

export default Library