import React, { useEffect, useState } from 'react'
import Card from './Card'
import callApi from '../utils/callApi'
import { Link } from 'react-router-dom'

function Books({category, buttonHidden=false, layout='flex', limit=5}) {
  const [books, setBooks] = useState([])

  
  useEffect(() => {
    ;(async() => {
      const bookData = await callApi(`https://openlibrary.org/subjects/${category}.json?limit=${limit}&has_fulltext=true&sort=new`)
      
      if(!bookData) return

      const result = bookData.response?.data?.works?.map((book) => {
        const coverId = book?.cover_id || null
        const authorId = book?.authors[0]?.key.split('/')[2] || null
        
        return {
          title: book.title,
          key: book.key,
          bookId: book.cover_edition_key || null,
          author_name: book?.authors[0].name || null,
          first_publish_year: book.first_publish_year || null,
          subjects: book.subject || [],
          coverUrl: coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false`
            : null,
          authorUrl: authorId
          ? `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg`
          : null
        }
      })

      setBooks(result)
    })()

  }, [category])
  return (
    <div 
      className={`section-teriatory min-h-[400px] text-color shadow-md ${ layout === 'flex' ? 'flex flex-col  gap-2 overflow-x-auto scrollbar-hide': 'overflow-hidden'} rounded-md mx-2 py-3`}
    >
      <div className={`relative ${ layout === 'grid' ? '' : 'flex justify-between'} px-3 `}>
        <h2 className={`inline-block font-bold ${buttonHidden && 'z-20 text-2xl section-teriatory p-2 px-3 fixed -translate-y-3 rounded-br-xl'}`}>{category?.charAt(0).toUpperCase()+category?.slice(1)}</h2>
        <Link to={`/categories/${category}`} className={`${buttonHidden ? 'hidden' : ''} p-2 bg-blue-200 text-sm rounded-md text-blue-700 active:scale-[0.97] duration-150 cursor-pointer`}>
          See All 
        </Link>
      </div>
      <div className={`${ layout === 'grid' ? 'overflow-hidden' : ' overflow-scroll scrollbar-hide'} flex w-full`}>
        <div className={`w-max lg:w-full ${ layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full py-8' :  'flex'} xl:px-8 2xl:px-16 `}>
          
        {books && books.map((book) => {
          return (
            <div key={book.key} className={`flex ${ layout === 'grid' ? 'w-full' : 'w-1/5' } gap-1 items-start flex-col hover:-translate-y-2 duration-300 hover:shadow-md hover:rounded-md py-3 `}>
              <Card workKey={book.key} imageUrl={book.coverUrl} bookName={book.title} bookId={book.bookId}/>
              <span className='text-color pe-3 text-sm font-semibold ps-3 line-clamp-2'>
                {book.title }
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