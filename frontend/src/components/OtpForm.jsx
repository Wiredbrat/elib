import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import callApi from '../utils/callApi'
import { AuthContext } from '../context/AuthContext'
import userRoutes from '../routes/user.routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { ThemeContext } from '../context/ThemeContext'
import '../index.css'

function OtpForm() {
  const { authData, setAuthData } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm()

  const onSubmitOtp = async(data) => {
    console.log(authData)
    const sendData = {
      email: authData.email,
      otp: data.otp
    }
    try {
      console.log("Submitted Data", data)
      const response = await callApi(userRoutes.verifyOtp, sendData)
      console.log(response.data)
      
      if(response.data?.statusCode === 200) {
        toast.success('OTP Verified!', {position: 'bottom-center'})
        const authResponse = await callApi(userRoutes.register, 'post', authData)
        if(authResponse.data?.statusCode === 200) {
          navigate('/login')
        }else{
          console.log('Server Error', authResponse.data?.error || 500)
          navigate('/server-error')
        }
        setAuthData(null)
      }else{
        toast.error('Invalid OTP!', {position: 'bottom-center'})
        console.log('Server Error', response.data?.error || 500)
      }

    } catch (error) {
      console.log("error")
      console.log(error)
    }
    
  }

  return (
    <>
      <div className={`flex justify-center items-center h-screen w-screen ${theme === 'dark' ? 'dark': ''}`}>
        <motion.div
          className='w-80%] md:w-3/4 lg:w-1/4 px-8 py-12 shadow-xl'
        >
          <p className='text-center my-6'>
            <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-black to-gray-300 bg-clip-text'>
              Enter 
            </span> &nbsp;
            <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-blue-300 bg-clip-text'>
              OTP
            </span>
          </p>
          <form onSubmit={handleSubmit(onSubmitOtp)}
            className='flex flex-col gap-4 text-sm'
          >

            <div className='flex border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow select-none'>
              <input 
                type='number'
                {...register("otp", { required: true, valueAsNumber: true})} 
                placeholder='Enter OTP'
                className='outline-0 border-0 w-[100%] select-none'
              /> 
            
            </div>
            
            <input 
            type="submit" 
            value="Verify"
            className='button rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
            />
            
          </form>
        </motion.div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default OtpForm