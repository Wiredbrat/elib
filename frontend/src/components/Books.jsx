import React, { useEffect, useState } from 'react'
import Card from './Card'
import callApi from '../utils/callApi'

function Books({category}) {
  const [books, setBooks] = useState([])

  
  useEffect(() => {
    ;(async() => {
      const bookData = await callApi(`https://openlibrary.org/subjects/${category}.json?limit=5&has_fulltext=true`)
      
      if(!bookData) return

      const result = bookData.response?.data?.works?.map((book) => {
        const coverId = book?.cover_edition_key || null
        const authorId = book?.authors[0]?.key.split('/')[2] || null
        
        return {
          title: book.title,
          key: book.key,
          author_name: book?.authors[0].name || null,
          first_publish_year: book.first_publish_year || null,
          subjects: book.subject || [],
          coverUrl: coverId
            ? `https://covers.openlibrary.org/b/olid/${coverId}-L.jpg`
            : null,
          authorUrl: authorId
          ? `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg`
          : null
        }
      })

      console.log(bookData)
      setBooks(result)
    })()

  }, [category])
  return (
    <div className='section-teriatory text-color flex flex-col shadow-md gap-2 overflow-x-auto scrollbar-hide rounded-md mx-2 py-3'>
      <div className='flex justify-between px-3 '>
        <h2 className='inline-block font-bold'>{category.charAt(0).toUpperCase()+category.slice(1)}</h2>
        <button className='p-2 bg-blue-200 text-sm rounded-md text-blue-700 active:scale-[0.97] duration-150 cursor-pointer'>
          See All 
        </button>
      </div>
      <div className='w-full overflow-scroll scrollbar-hide'>
        <div className='w-max lg:w-full flex xl:px-8 2xl:px-16'>
          
        {books && books.map((book) => {
          return (
            <div key={book.key} className='flex gap-1 w-1/5 items-start flex-col'>
              <Card imageUrl={book.coverUrl} bookName={book.title}/>
              <span className='text-color pe-3 text-sm font-semibold ps-3 line-clamp-1'>
                {book.title}
              </span>
              <span className='text-color-alt text-sm ps-3 line-clamp-1'>
                {book?.author_name}
              </span>
            </div>
          )
        })}
        
        </div>
      </div>
    </div>
  )
}

export default Books