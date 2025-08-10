import axios from 'axios'

export default async function callApi(url, reqType = 'get', data = null) {

  try {
    let response =
    reqType === 'post' 
    ?await axios[reqType](url, data) 
    :await axios[reqType](url)

    // console.log(response)
    return { response } 

  } catch (error) {
    console.log({
      StatusCode: 500,
      data: error.data,
      success: false 
    })
    return {
      StatusCode: 500,
      data: error.data,
      success: false 
    }
  }
  
}
