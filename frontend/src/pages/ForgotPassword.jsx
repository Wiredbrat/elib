import axios from 'axios'
import { useForm } from 'react-hook-form'
import userRoutes from '../routes/user.routes'
import { motion, AnimatePresence } from "motion/react"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function ForgotPassword() {
  const {
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
  } = useForm()

  const submitForm = async(data) => {
  
      try {
      const response = await axios.post(userRoutes.resetPassword, data, {withCredentials: true})
      if(response.data.statusCode === 200) {
        toast.success('OTP Sent!', {position: 'bottom-center'})
        navigate('/otp', )
      }else {
        toast.error('Something Went Wrong!', {position: 'bottom-center'})
      }
      
      // console.log(response.data)
      } catch (error) {
        console.log('Error:' ,error)
        toast.error('Something Went Wrong!', {position: 'bottom-center'})
      }
    } 
  
  return (
    <>
      <div className='relative h-screen w-full flex pt-24'>
                <AnimatePresence initial={true} className="">
                  {
                  <motion.div 
                    initial={{opacity: 0, x: 300, scale: 1}}
                    animate={{opacity:1, x: 0, scale: 1}}
                    exit={{opacity: 0, x: -300, scale: 1}}
                    key='registrationForm'
                    className='p-4 w-[70%] md:w-[30%] mx-auto text-color'
                  >
      
                    <p className='text-center my-6'>
                      <span className='inline-block font-bold text-xl text-transparent text-color'>
                        Enter  
                      </span> &nbsp;
                      <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-blue-300 bg-clip-text'>
                        Email
                      </span>
                    </p>
                    <form onSubmit={handleSubmit(submitForm)} 
                      className='flex flex-col gap-4 text-sm '
                    >
      
                      <input 
                        type="text" {...register("email", { required: true })} 
                        placeholder='Email'
                        className='input shadow-gray-500 border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                      />
      
                      
                      
                        <button
                          type="submit" value="Register" 
                          className='button rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
                          
                        >
                          Send OTP
                        </button>
                      
                    </form>
                  </motion.div> 
                  
                }
                </AnimatePresence>
                <ToastContainer/>

              </div>
    </>
  )
}

export default ForgotPassword