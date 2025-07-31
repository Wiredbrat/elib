import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useApi(url, reqType, data = null) {
  const [response, setResponse] = useState()

  (async()=> {
      try {
      let response ;
      reqType === 'post' ?
        response = await axios[reqType](url, data) 
      :
        response = await axios[reqType](url)

      setResponse(response.data) 


    } catch (error) {
      return {
        error
      }
    }
  })

  return { response } 
}
