import React, { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import '../index.css'
import { Link } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { BiBookContent } from "react-icons/bi";
import { LuNotebook } from "react-icons/lu";
import { LuDoorOpen } from "react-icons/lu";
import { PiChatsCircle } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

function Sidebar({isSidebarVisible}) {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <>
      <div className={`section z-[2000] py-8 flex flex-col justify-between h-screen w-[80%] md:w-1/5 shadow-lg absolute top-0 ${isSidebarVisible? 'left-0' : 'left-[-80%]'} md:left-0 duration-200 ease-out`}>
        <div className='md:mx-12 mx-6'>
          <span className='inline-block p-2 mb-12'>Logo</span>

          <ul className={`text-color flex flex-col gap-4`}>
            <li >
              <Link to='/discover' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <GoHome/>
                </span> 
                Discover
              </Link>
            </li>
            <li>
              <Link to='/categories' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <BiBookContent/> 
                </span>
                Category
              </Link>
            </li>
            <li>
              <Link to='/manga' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <LuNotebook />
                </span> 
                Manga
              </Link>
            </li>
            <li>
              <Link to='/library' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <LuDoorOpen/> 
                </span>
                My Library
              </Link>
            </li>
            {/* <li></li>
            <li></li> */}
          </ul>
        </div>
        <hr className='text-transparent h-1 shadow'/>
        <div className='md:mx-12 mx-6'>
          <ul className={`text-color flex flex-col gap-4`}>
            <li>
              <Link to='' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <IoSettingsOutline/> 
                </span>
                Settings
              </Link>
            </li>
            <li>
              <Link to='' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <PiChatsCircle/> 
                </span>
                Support
              </Link>
            </li>
            <li>
              <Link to='/logout' className='flex items-center gap-1 hover:-translate-y-[2px] duration-200 hover:scale-[1.03]'>
                <span className='section-alt p-[6px] rounded-md'>
                  <IoIosLogOut /> 
                </span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <button
          className='text-color flex relative w-1/4 md:w-[60%] -translate-z-px rounded-3xl left-3 md:left-1/2 md:translate-x-[-50%] border p-[6px] duration-200'
        >
            <span className={`text-color relative inline-block h-6 aspect-square border rounded-full ${theme === 'light' ? 'translate-x-0 shadow-xs shadow-black': 'translate-x-[150%] md:translate-x-[480%] shadow-xs shadow-amber-50'} duration-400 cursor-pointer`}
              onClick={() => {setTheme(theme === 'light' ? 'dark' : 'light')}}
              role='button'
              >
                {/* sun icon */}
                <svg
                  className={`absolute top-1/2 left-1/2 translate-[-50%] ${theme === 'dark' ? 'hidden' : 'block'} swap-on h-4 w-4 fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className={`absolute top-1/2 left-1/2 translate-[-50%] ${theme === 'light' ? 'hidden' : 'block'} swap-off h-4 w-4 fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </span>
        </button>
 
      </div>
    </>
  )
}

export default Sidebar