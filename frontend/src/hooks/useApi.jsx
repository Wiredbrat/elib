import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useApi(url, reqType, data = null) {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    ;(async()=> {
      try {
      setLoading(true)
      let response ;
      reqType === 'post' ?
        response = await axios[reqType](url, data) 
      :
        response = await axios[reqType](url)

      setResponse(response.data) 
      setLoading(false)

    } catch (error) {
      setError(true)
      setLoading(false)
      console.log('Server Error: ',error)

    }
    })()
  }, [url, reqType, data])

  return { loading, error, response } 
}
