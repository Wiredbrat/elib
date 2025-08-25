import axios from "axios";
import { createContext, useEffect, useState } from "react";
import userRoutes from "../routes/user.routes";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(() => {
    const userData = localStorage.getItem(('authData'))
    return userData ? JSON.parse(userData) : null
  })  

  const getUser = async() => {
    try {
      const user = await axios.get(userRoutes.getUser, {withCredentials: true})
      console.log(user.data.data)
      if(user.status !== 200) {
        setAuthData(null)
        localStorage.removeItem('authData')
        return
      }
      setAuthData(user.data.data)
      localStorage.setItem('authData', JSON.stringify(user.data.data))
    } catch (error) {
      console.log('error while fetching user data', error)
    }
  }
  
  useEffect(() => {
    if(!authData) getUser()
  }, [])

  return (
    <AuthContext.Provider value={{authData, setAuthData}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}