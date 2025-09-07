import React, { useEffect, useMemo, useState, useRef, useContext } from 'react'
import debounce from '../utils/debounce'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SlMagnifier } from "react-icons/sl";
import { ThemeContext } from '../context/ThemeContext';
import { handleCardClick } from '../utils/handleCardClick';
import { BookContext } from '../context/BookContext';

function Searchbar({onClick, handleUser}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useContext(ThemeContext)
  const {bookData, setBookData} = useContext(BookContext)
  
  const searchHandler = useMemo(() => debounce(handleChange, 500), [])
  const searchRef = useRef(null)

  async function handleChange(title) {
    // console.log('searched')
    // console.log(title)
    try { 
      if(!title) return
      setLoading(true) 
      setSearchOpen(true)
      setError(false)
      const searchResult = await axios.get(`https://elib-4gnk.onrender.com/api/v1/books/search`, {
        params: {
          title: title,
          limit: 8
        } 
      })
      
      console.log(searchResult.data)
      setData(searchResult.data.data)
      setLoading(false)

      return
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {

    const handleClick = (e) => {
      if(searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click' ,handleClick)
  },[])
  
  return (
    <>
      <div className='section z-40 flex gap-2 absolute w-full md:w-[70%] lg:w-[80%] top-0 right-0 lg justify-between items-center bg-white shadow-md p-2 md:p-3 md:px-5'>
      <div className='w-fit md:hidden'> 
        <span className='inline-block bg-gradient-to-r from-red-400 to-purple-300 bg-clip-text text-transparent font-bold text-sm'>E-Lib</span>  
      </div>
        <div className='relative max-w-xl w-2/4 md:w-1/2 '>
          <input
            className=' outline-0 px-8 text-sm py-[6px] md:py-2 w-full bg-slate-200 rounded text-slate-600'
            type="text" 
            placeholder={`Search here`}
            onChange={(e) => searchHandler(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <SlMagnifier className='absolute top-[10px] left-2 text-slate-500'/>
          <div 
          ref={searchRef}
          className={`searchArea z-[2000] rounded absolute ${ searchOpen ? 'block' : 'hidden'} w-[150%] md:w-full bg-gray-100 p-1 shadow-2xl mt-1 border border-gray-200 max-h-[400px] overflow-y-scroll scrollbar-hide`}

          >
            {loading &&
              <span className='block h-6 aspect-square rounded-full animate-spin bg-transparent border-4 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-gray-200 mx-auto'></span> 
            }
            {
              (data.length === 0) && <p className=' text-gray-500 text-center'>Nothing found</p>
            }
            {
              !loading && !error && data && 
              <div className=''>
              {data.map((book) => {
                // console.log(book.coverId)
                return (
                  <div 
                    onClick={() => {
                      handleCardClick(book.coverId, book.workKey, book.coverUrl, setBookData)
                      // setSearchOpen(false)
                    }} 
                    key={book.coverId} className='flex gap-3 p-2 mx-1  mb-1 shadow-md bg-white cursor-pointer'>
                  <div className=''>
                    <img className='line-clamp-1 h-full w-[50px] object-cover' src={book.coverUrl || `../public/coverr.webp`} alt={book.title} />
                  </div>
                  <div className=''>
                    <span className='font-semibold line-clamp-1'>{book.title}</span>
                    <span className='inline-block text-sm line-clamp-1'>{book?.author_name}</span>
                    <span className='block text-sm'>{book?.first_publish_year}</span>
                  </div>
                </div>
              )
            })}
            </div>
            }
          </div>
        </div>
        <div className='grid md:grid-cols-2 w-fit gap-3 '>
          <button
            className={`toggler md:flex h-10 aspect-square hidden rounded-3xl outline-0 ${theme === 'light' ? 'bg-blue-100': 'bg-gray-700'}`}
            >
            <span className={`text-color relative inline-block aspect-square rounded-full  duration-400 cursor-pointer`}
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

          <div 
            tabIndex={0}
            role='button'
            className='userButton overflow-hidden rounded-md h-8 md:hidden aspect-square bg-blue-100 cursor-pointer'
            onClick={onClick}
          >
            <img src="../../public/avatar/avatar-male.png" alt="" />
          </div>
          
        <div 
          className='rounded-full overflow-hidden hidden md:block md:h-10 aspect-square bg-blue-100 cursor-pointer'
          onClick={handleUser}
        >
            <img src="/avatar/avatar-male.png" alt="avatar" />
        </div>
        </div>

      </div>
    </>
  )}

export default Searchbar