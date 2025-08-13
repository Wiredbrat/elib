import React, { useContext, useEffect } from 'react'
import callApi from '../utils/callApi'
import userRoutes from '../routes/user.routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function Logout() {
  const navigate = useNavigate()
  const { setAuthData } = useContext(AuthContext)
  useEffect(() => async() => {
    try {
      const logout = await axios.post('http://localhost:8000/api/v1/user/logout', {}, {withCredentials: true})
      
      if(logout.status === 200) {
        navigate('/discover')
        setAuthData(null)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  return 
}

export default Logout