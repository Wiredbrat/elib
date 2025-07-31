import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import useApi from '../hooks/useApi'
import { AuthContext } from '../context/AuthContext'
import userRoutes from '../routes/user.routes'
import { useNavigate } from 'react-router-dom'

function OtpForm() {
  const { authData} = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm()

  const onSubmitOtp = async(data) => {
    console.log("Submitted Data", data)

    const response = await useApi(userRoutes.verifyOtp, 'post', data)  

    if(response.statusCode === 200) {
      const response = await useApi(userRoutes.register, 'post', authData)

      if(response.statusCode === 200) {
        navigate('/login')
      }else{
        console.log('Server Error', response.error)
        navigate('/server-error')
      }

    }else{
      console.log('Server Error', response.error)
      navigate('/server-error')
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>
        <motion.div
          className='w-[25%] px-8 py-12 shadow-xl'
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
            className='bg-[var(--button)] text-[var(--primary)] rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
            />
            
          </form>
        </motion.div>
      </div>
    </>
  )
}

export default OtpForm