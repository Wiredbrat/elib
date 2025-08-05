import React, { useMemo, useState } from 'react'
import debounce from '../utils/debounce'
import axios from 'axios'

function Searchbar({onClick}) {
  
  const searchHandler = useMemo(() => debounce(handleChange, 500), [])
  
  async function handleChange(title) {
    console.log('searched')
    console.log(title)
    try {  
      const searchResult = await axios.get(`http://localhost:8000/api/v1/books/search`, {
        params: {
          title: title,
          limit: 10
        }
      })
      return console.log(searchResult.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className='flex absolute w-full md:w-[80%] top-0 right-0 lg justify-between items-center bg-white shadow-md p-2 md:p-3'>
        <div className='max-w-xl w-3/4 md:w-1/2 '>
          <input
            className='outline-0 px-3 text-sm md:text-base py-[6px] md:py-2 w-full bg-slate-200 rounded text-slate-600'
            type="text" 
            placeholder='Search here'
            onChange={(e) => searchHandler(e.target.value)}
          />  
        </div>
        <div className='rounded-full hidden md:block md:h-12 aspect-square bg-blue-100'>
        </div>
        <div 
          tabIndex={0}
          role='button'
          className='rounded-md h-8 md:hidden aspect-square bg-blue-100'
          onClick={onClick}
        ></div>
      </div>
    </>
  )}

export default Searchbar