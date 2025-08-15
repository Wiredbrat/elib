import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)

const ThemeProvider = ({children}) => {
  
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme) return savedTheme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    return systemTheme ? 'dark' : 'light'
  })
  
  useEffect(() => {
    const html = document.documentElement
    theme === 'dark' ? html.setAttribute('data-theme', 'dark') :  html.removeAttribute('data-theme')
    localStorage.setItem('theme', theme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}