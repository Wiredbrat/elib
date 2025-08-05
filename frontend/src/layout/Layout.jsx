import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { OtpForm } from '../Importer'
import Home from "../pages/Home";
import Login from "../pages/Login";

Login
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
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/otp' element={<OtpForm/>}/>

    </Route>
  )
)

export { router }