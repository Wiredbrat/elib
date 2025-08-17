import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookProvider }from './context/BookContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BookProvider>
          <App/>
        </BookProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
