import { useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import userRoutes from '../api_routes/user.routes'
import { motion, AnimatePresence } from "motion/react"
import { replace, useNavigate } from 'react-router-dom'


const LoginRegisterForm = () => {
  const {authData, setAuthData} = useContext(AuthContext)
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
      navigate('/otp', )
    }else {
      alert('otp not sent, please retry')
    }
    
    // console.log(response.data)
    } catch (error) {
      console.log('Error:' ,error)
    }
  } 

  const onSubmitLoginForm = async(data) => {
    try {
      const respone = axios.post(userRoutes.login, data)

      if((await respone).data.statusCode === 200) {
        navigate('/dashboard', {replace: true})
        return
      }
    } catch (error) {
      console.log(error)
      navigate('/404')      
    }
  }

  const [isRegister, setIsRegister] = useState(false)
  return (
    <section>
      <div className='h-screen w-full lg:w-[40%] flex flex-col relative items-center overflow-hidden py-4'>
        <div className='flex justify-end items-center gap-2 text-sm'>
          <p className='text-gray-600'>{isRegister? 'Already Registered?': `Don't have an account?`}</p>
          
          <motion.button
            initial={{opacity:0, scale: 0}}
            animate={{opacity: 1, scale:1, translate: {duration: 1}}} 
            onClick={() => setIsRegister((prev) => !prev)}
            className='text-black bg-gray-200 font-sans3 px-2 py-1 rounded-md shadow'
          >
            {isRegister? 'Sign Up' : 'Sign In'}
        </motion.button>
        </div>
        <div className='relative h-400px w-[90%] md:w-[70%] mx-auto'>
          <AnimatePresence initial={true} className="">
            {isRegister ? 
            <motion.div 
              initial={{opacity: 0, x: 300, scale: 1}}
              animate={{opacity:1, x: 0, scale: 1}}
              exit={{opacity: 0, x: -300, scale: 1}}
              key='registrationForm'
              className='p-4 w-full absolute top-0 left-0'
            >

              <p className='text-center my-6'>
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-black to-gray-300 bg-clip-text'>
                  Sign in to 
                </span> &nbsp;
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-blue-300 bg-clip-text'>
                  Elib
                </span>
              </p>
              <form onSubmit={handleSubmit(onSubmitRegistrationForm)} 
                className='flex flex-col gap-4 text-sm'
              >
                <input 
                  type="text" {...register("username", { required: true })} 
                  placeholder='User Name'
                  className='border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <input 
                  type="text" {...register("fullName", { required: true })} 
                  placeholder='Full Name'
                  className='border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <input 
                  type="text" {...register("email", { required: true })} 
                  placeholder='Email'
                  className='border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <div className='flex border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'>
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
                    className='bg-[var(--button)] text-[var(--primary)] rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
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
              className='p-4 w-full absolute top-0 left-0'
            >
              <p className='text-center my-6'>
                <span className='inline-block font-bold text-xl text-transparent bg-linear-to-r from-black to-gray-300 bg-clip-text'>
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
                  placeholder='Username or Email'
                  className='border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow'
                />

                <div className='flex border border-gray-200 w-full px-3 py-4 rounded-xl outline-0 shadow select-none selection:bgt'>
                  <input 
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onSelect={(e) => e.preventDefault()}
                    type={`${showPassword ? 'text': 'password'}`} {...register("password", { required: true})} 
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
                
                  <input 
                  type="submit" 
                  value="Login"
                  className='bg-[var(--button)] text-[var(--primary)] rounded-md py-3 shadow hover:scale-[1.01] duration-150 active:scale-[0.99] cursor-pointer'
                  />
                
              </form>
              {/* <Link to=''>forgot password?</Link> */}
            </motion.div>
          }
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default LoginRegisterForm