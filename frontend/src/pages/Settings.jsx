import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import userRoutes from '../routes/user.routes'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const navigate = useNavigate()
  const authData = JSON.parse(localStorage.getItem('authData'))

  const handleChangePasswordClick = async () => {
    try {
        const response = await axios.post(userRoutes.otp, {email: authData.email}, {withCredentials: true})
        if(response.data.statusCode === 200) {
          toast.success('OTP Sent!', {position: 'bottom-center'})
          navigate('/otp', )
        }else {
          toast.error('Something Went Wrong!', {position: 'bottom-center'})
        }
    }catch(error) {
      console.log(error)
    }

  }
  return (
    <div className='absolute w-full md:w-[69%] lg:w-[79%] top-20 md:right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto mx-5`}>
        <button className='button' onClick={handleChangePasswordClick}>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default Settings