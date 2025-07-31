import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { LoginRegisterForm, OtpForm } from '../Importer'
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
      <Route path='/otp' element={<OtpForm/>}/>
    </Route>
  )
)

export { router }