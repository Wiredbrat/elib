import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import LoginRegisterForm from '../components/LoginRegisterForm'
function Layout() {
  return (
    <>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/login' element={<LoginRegisterForm/>}/>
    </Route>
  )
)

export { router }