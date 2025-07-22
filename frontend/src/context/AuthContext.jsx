import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState({})
  return (
    <AuthContext.Provider value={{authData, setAuthData}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}