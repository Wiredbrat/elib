import { useContext, useState } from 'react'
import './App.css'
import { ThemeContext } from './context/ThemeContext'
import LoginRegisterForm from './components/LoginRegisterForm'

function App() {
  const [count, setCount] = useState(0)
  const {theme, setTheme} = useContext(ThemeContext)
  return (
    <>
      <div className='font-inter'>

        <LoginRegisterForm/>
      </div>
    </>
  )
}

export default App
