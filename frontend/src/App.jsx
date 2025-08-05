import { useContext, useState } from 'react'
import './App.css'
import { ThemeContext } from './context/ThemeContext'
import { RouterProvider } from 'react-router-dom'
import {router} from './layout/Layout.jsx'
function App() {
  const [count, setCount] = useState(0)
  const {theme, setTheme} = useContext(ThemeContext)

  
  return (
    <>
      <div className='font-inter bg-slate-200 h-screen w-full'>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
