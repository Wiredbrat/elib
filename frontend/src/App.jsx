import { useContext, useState } from 'react'
import './index.css'
import { ThemeContext } from './context/ThemeContext'
import { RouterProvider } from 'react-router-dom'
import {router} from './layout/Layout.jsx'
function App() {
  const [count, setCount] = useState(0)
  const {theme, setTheme} = useContext(ThemeContext)

  
  return (
    <>
      <div className={`font-google-open-sans h-screen w-full section-alt`}>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
