import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { useEffect, useState } from 'react'
import { BookContext } from '../context/BookContext'
import { motion } from 'motion/react'
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { addBook } from '../utils/bookTasks'

function BookDetails({}) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const bookRef = useRef(null)
  const { bookData, setBookData } = useContext(BookContext)
  
  useEffect(() => {
    if(bookData) {
      setDetailsOpen(true)
      console.log(bookData)
    }
  }, [bookData])

  useEffect(() => {
    const handleClick = (e) => {
      if(bookRef.current && !bookRef.current.contains(e.target)) {
        setDetailsOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click' ,handleClick)
  },[detailsOpen])

  return (
    <div
      ref={bookRef} 
      className={`bookDetails z-20 fixed w-full md:w-[35%] lg:w-1/5 h-1/2 md:h-full md:top-0 md:bottom-0 ${ detailsOpen ? 'bottom-0 md:right-0': 'bottom-[-50%] md:right-[-35%] lg:right-[-20%]'} duration-200 shadow-md`}
    >
      <div className='mt-16 p-5 grid grid-cols-1'>
        <motion.div 
          initial={{opacity: 0, y: 20}}
          animate={{opacity:1, y: 0, transition: {duration: 0.3}}}
          className={`bg-blue-300 relative rounded-md px-3 mx-auto py-4 m-2 w-3/4 shadow-md`}
        >
          <img 
          className='h-46 w-[90%] object-fill mx-auto outline-0'
          src={bookData?.coverUrl} 
          alt="" 
          />
        </motion.div>
        <h3 className='text-center text-white font-semibold text-[15px] line-clamp-2'>{bookData?.data.title}</h3>
        <p className='text-[13px] text-blue-200 mt-1 mx-auto'>{bookData?.author}</p>
        <p className='mx-4 text-blue-200 text-sm flex gap-5 mt-3'>
          <span className='flex flex-col py-1 justify-center items-center'>
            <span className='mx-auto inline-block'>
              {bookData?.rating?.summary?.average
              ? bookData.rating.summary.average.toFixed(1) + '/5'
              : '0/5'} 
            </span>
            <span className='text-[12px]'>Stars</span>
          </span>
          <span className='flex flex-col border-x-[1px] px-4 py-1'>
            <span className='mx-auto inline-block'>
              {bookData?.rating?.summary?.count}
            </span>
            <span className='text-[12px]'>Ratings</span>
          </span>
          <span className='flex flex-col pe-4 py-1'>
            <span className='mx-auto inline-block'>
              {bookData?.data?.number_of_pages ? bookData?.data?.number_of_pages : 0}
            </span>
            <span className='text-[12px]'>Pages</span>
          </span>
          
        </p>
        <p className='text-[12px] text-white mt-2 line-clamp-4 text-center'>
          {bookData?.data?.description?.value || bookData?.data?.first_sentence?.value || 'Description not available'}
        </p>
        <button 
          onClick={() => addBook(bookData)} 
          className='cursor-pointer mt-5 w-[90%] rounded-md hover:scale-[1.02] duration-200 text-sm mx-auto bg-blue-600 py-2 text-white flex justify-center items-center gap-2'
        >
          Plan to Read {<MdOutlineBookmarkAdd className='text-base'/>}
        </button>
      </div>
    </div>
  )
}

export default BookDetails