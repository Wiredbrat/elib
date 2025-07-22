import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)

const ThemeProvider = ({children}) => {
  
  const [theme, setTheme] = useState()
   
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  if(systemTheme) {
    localStorage.setItem('theme', 'dark')
  }else {
    localStorage.setItem('theme', 'light')
  }
  
  useEffect(() => {
    const currTheme = localStorage.getItem('theme')
    setTheme(currTheme)
  }, [])
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}