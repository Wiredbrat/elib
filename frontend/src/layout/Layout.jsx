import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { OtpForm, Content, Library, Category, Logout, BookDetails, User, ExploreBooks, Settings, Support, NotFound } from '../Importer'
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Suspense } from 'react';

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
      <Route path='/book/:bookId' element={<BookDetails/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/categories/:category' element={<ExploreBooks/>}/>
      <Route path='/user/settings' element={<Settings/>}/>
      <Route path='/support' element={<Support/>}/>
      
    </Route>
    <Route path='*' element={<NotFound/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/otp' element={<OtpForm/>}/>
    <Route path='/logout' element={<Logout/>}/>
    </>
  )
)

export { router }