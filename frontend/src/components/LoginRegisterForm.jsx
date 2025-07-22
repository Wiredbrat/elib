import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import userRoutes from '../api_routes/user.routes'

const LoginRegisterForm = () => {
  const {authData, setAuthData} = useContext(AuthContext)

  const {
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
  } = useForm()

  const onSubmit = async(data) => {
    setAuthData(data)
    console.log(authData)

    try {
    const response = await axios.post(userRoutes.register, data)
    console.log(response.data)
    } catch (error) {
      console.log('Error:' ,error)
    }
  } 
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("username", { required: true })} placeholder='User Name'/>
        <input type="text" {...register("fullName", { required: true })} placeholder='Full Name'/>
        <input type="text" {...register("email", { required: true })} placeholder='Email'/>
        <input type="text" {...register("password", { required: true })} placeholder='Password'/>
        <input type="submit" value="Register"/>
      </form>
    </>
  )
}

export default LoginRegisterForm