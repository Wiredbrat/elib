import { useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import userRoutes from '../routes/user.routes'
import { motion, AnimatePresence } from "motion/react"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


const LoginRegisterForm = () => {
  const {setAuthData} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const {
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
  } = useForm()

  const onSubmitRegistrationForm = async(data) => {
    setAuthData(data)

    try {
    const response = await axios.post(userRoutes.otp, data)
    if(response.data.statusCode === 200) {
      toast.success('OTP Sent!', {position: 'bottom-center'})
      navigate('/otp', )
    }else {
      toast.error('Something Went Wrong!', {position: 'bottom-center'})
    }
    
    // console.log(response.data)
    } catch (error) {
      console.log('Error:' ,error)
    }
  } 

  const isEmail = (value) => {
    // Simple regex to validate email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const onSubmitLoginForm = async(data) => {
    const identifier = data.usernameOrEmail.trim()
    const payload = isEmail(identifier)
    ? {username: null, email: identifier, password: data.password}
    : {username: identifier, email: null, password: data.password}
    
    console.log(payload.username)
    try {
      const response = await axios.post(userRoutes.login, payload)
      console.log(response)
      if(response.data?.statusCode === 200) {
        toast.success('Welcome', {position: 'bottom-center'})
        navigate('/discover', {replace: true})
        return
      }else{
        toast.error('Invalid Credentials!', {position: 'bottom-center'})
      }
    } catch (error) {
      console.log(error)
      toast.error('Invalid Credentials', {position: 'bottom-center'})
    }
  }

  useEffect(() => {
    errors.usernameOrEmail?.type === 'required' && 
    toast.error('Enter Username or Email', {position: 'bottom-right'})

    errors.password?.type === 'required' && 
    toast.error('Enter password', {position: 'bottom-right'})

    return () => {
      console.log('error handled')
    }
  }, [errors.usernameOrEmail, errors.password])

  const [isRegister, setIsRegister] = useState(false)
  return (
    <>
      <div className='h-screen w-full flex flex-col relative items-center overflow-hidden py-4'>
        <div className='flex justify-end items-center gap-2 text-sm'>
          <p className='text-color'>{isRegister? 'Already Registered?': `Don't have an account?`}</p>
          
          <motion.button
            initial={{opacity:0, scale: 0}}
            animate={{opacity: 1, scale:1, translate: {duration: 1}}} 
            onClick={() => setIsRegister((prev) => !prev)}
            className='text-color button font-sans3 px-2 py-1 rounded-md shadow'
          >
            {isRegister? 'Sign Up' : 'Sign In'}
        </motion.button>
        </div>
        <div className='relative h-screen w-[90%] flex items-center '>
          <AnimatePresence initial={true} className="">
            {isRegister ? 
            <motion.div 
              initial={{opacity: 0, x: 300, scale: 1}}
              animate={{opacity:1, x: 0, scale: 1}}
              exit={{opacity: 0, x: -300, scale: 1}}
              key='registrationForm'
              className='p-4 w-full absolute top-0 text-color'
            >

              <p className='text-center my-6'>
                <span className='inline-block font-bold text-xl text-transparent text-color'>
                  Sign in to 
                </span> &nbsp;
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-blue-300 bg-clip-text'>
                  Elib
                </span>
              </p>
              <form onSubmit={handleSubmit(onSubmitRegistrationForm)} 
                className='flex flex-col gap-4 text-sm '
              >
                <input 
                  type="text" {...register("username", { required: true })} 
                  placeholder='User Name'
                  className='input border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <input 
                  type="text" {...register("fullName", { required: true })} 
                  placeholder='Full Name'
                  className='input border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <input 
                  type="text" {...register("email", { required: true })} 
                  placeholder='Email'
                  className='input border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <div className='input flex border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'>
                  <input 
                    type={`${showPassword ? 'text': 'password'}`} {...register("password", { required: true, minLength:{value: 6, message: 'password is too short'}})} 
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onSelect={(e) => e.preventDefault()}
                    placeholder='Password'
                    className='outline-0 border-0 w-[90%] select-none'
                  /> 
                  <span 
                    onClick={() => {setShowPassword((prev => !prev))}}
                    className='cursor-pointer'
                  >
                    {showPassword? <i className="fa-solid fa-eye-slash text-gray-500"></i> : <i className="fa-solid fa-eye text-gray-500"></i>}
                  </span>
                </div>
                
                  <button
                    type="submit" value="Register" 
                    className='button rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
                  >
                    Register
                  </button>
                
              </form>
            </motion.div> 
            : 
            <motion.div 
              initial={{opacity: 0,  x: -300, scale: 1}}
              animate={{opacity:1,  x: 0, scale: 1}}
              exit={{opacity: 0,  x: 300, scale: 1}}
              key='loginForm'
              className='p-4 w-full absolute top-0 text-color'
            >
              <p className='text-center my-6'>
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r text-color bg-clip-text'>
                  Sign Up to 
                </span> &nbsp;
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-blue-300 bg-clip-text '>
                  Elib
                </span>
              </p>
              
              <form onSubmit={handleSubmit(onSubmitLoginForm)}
                className='flex flex-col gap-4 text-sm'
              >
                <input 
                  type="text" {...register("usernameOrEmail", { required: true })} 
                  aria-invalid={errors.usernameOrEmail ? 'true' : 'false'}
                  placeholder='Username or Email'
                  className='input border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />
                

                <div className='flex input border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow select-none selection:bgt'>
                  <input 
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onSelect={(e) => e.preventDefault()}
                    type={`${showPassword ? 'text': 'password'}`} {...register("password", { required: true})} 
                    placeholder='Password'
                    className='outline-0 border-0 w-[90%] select-none '
                  /> 
                  <span 
                    onClick={() => {setShowPassword((prev => !prev))}}
                    className='cursor-pointer'
                  >
                      {showPassword? <i className="fa-solid fa-eye-slash text-color"></i> : <i className="fa-solid fa-eye text-color"></i>}
                  </span>
                </div>
                
                  <input 
                  type="submit" 
                  value="Login"
                  className='button rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
                  />
                
              </form>
              <p className='text-center my-5'>
                <Link className="text-blue-600" to='/reset-password'>Forgot password?</Link>
              </p>
            </motion.div>
          }
          </AnimatePresence>
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default LoginRegisterForm