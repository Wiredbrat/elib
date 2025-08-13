import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookDetails() {
  const { bookId } = useParams()
  const {data, setData} = useState([])
  const {loading, setLoading} = useState(false)
  const {error, setError} = useState(false)
  useEffect(() => {
    ;(async() => {
      try {
        setLoading(true)
        const bookDetails = await axios.get(`https://openlibrary.org/books/${bookId}${`.json`}`, {withCredentials: true})
        if(!bookDetails.status === 200) {
          setError(true)
        }
        setLoading(false)
        setData(bookDetails.data.data)
      } catch (error) {
        setError(true)
        console.log('Error while fetching data', error)
      }

      return () => {
        // setData([])
        setError(false)
        setLoading(false)
      }
    })()
  }, [bookId])
  return (
    <div className='absolute top-0 bottom-0 right-0 md:w-1/4 bg-indigo-800'>

    </div>
  )
}

export default BookDetails