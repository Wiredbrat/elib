import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)

const ThemeProvider = ({children}) => {
  
  const [theme, setTheme] = useState('light')
  const html = document.documentElement
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  if(systemTheme) {
    localStorage.setItem('theme', 'dark')
    theme === 'dark' ? html.setAttribute('data-theme', 'dark') :  html.removeAttribute('data-theme')
  }else {
    localStorage.setItem('theme', 'light')
     html.removeAttribute('data-theme')
  }
  
  useEffect(() => {
    const currTheme = localStorage.getItem('theme')
    localStorage.setItem('theme', currTheme)
    setTheme(currTheme)
  }, [])
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}