import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { OtpForm, Content, Library, Category, Logout } from '../Importer'
import Home from "../pages/Home";
import Login from "../pages/Login";

Login
function Layout() {
  return (
    <>
      <Home/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='/discover' element={<Content/>}/>
      
      <Route path='/library' element={<Library/>}/>
      <Route path='/categories' element={<Category/>}/>
    </Route>
    
    <Route path='/login' element={<Login/>}/>
    <Route path='/otp' element={<OtpForm/>}/>
    <Route path='/logout' element={<Logout/>}/>
    </>
  )
)

export { router }