import React, { useEffect, useMemo, useState, useRef } from 'react'
import debounce from '../utils/debounce'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SlMagnifier } from "react-icons/sl";

function Searchbar({onClick}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  
  const searchHandler = useMemo(() => debounce(handleChange, 500), [])
  const searchRef = useRef(null)

  async function handleChange(title) {
    console.log('searched')
    console.log(title)
    try { 
      if(!title) return
      setLoading(true) 
      setSearchOpen(true)
      setError(false)
      const searchResult = await axios.get(`http://localhost:8000/api/v1/books/search`, {
        params: {
          title: title,
          limit: 3
        } 
      })
      console.log(searchResult.data.data)
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
      <div className='flex gap-2 absolute w-full md:w-[80%] top-0 right-0 lg justify-between items-center bg-white shadow-md p-2 md:p-3'>
        <div className='relative max-w-xl w-3/4 md:w-1/2 '>
          <input
            className='outline-0 px-3 text-sm md:text-base py-[6px] md:py-2 w-full bg-slate-200 rounded text-slate-600'
            type="text" 
            placeholder={`Search here`}
            onChange={(e) => searchHandler(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <div 
          ref={searchRef}
          className={`searchArea z-[2000] rounded absolute ${ searchOpen ? 'block' : 'hidden'} w-[130%] md:w-full bg-gray-100 p-1 shadow-2xl mt-1 border border-gray-200`}

          >
            {loading &&
              <span className='block h-6 aspect-square rounded-full animate-spin bg-transparent border-4 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-gray-200 mx-auto'></span> 
            }
            {
              (error || data.numFound === 0 ) && <p className=' text-gray-500 text-center'>Nothing found</p>
            }
            {
              !loading && !error && data && 
              data.map((book, index) => {
                return (
                <Link to='/book' className='block p-2 mx-1  mb-1 shadow-md bg-white'>
                  <span key={index}>{book.title}</span>
                  <span>{book?.first_publish_year}</span>
                  <span key={index}>{book?.author_name}</span>
                </Link>
              )
              })
            }
          </div>
        </div>
        <div className='rounded-full hidden md:block md:h-12 aspect-square bg-blue-100 cursor-pointer'>
        </div>
        <div 
          tabIndex={0}
          role='button'
          className='rounded-md h-8 md:hidden aspect-square bg-blue-100 cursor-pointer'
          onClick={onClick}
        ></div>
      </div>
    </>
  )}

export default Searchbar