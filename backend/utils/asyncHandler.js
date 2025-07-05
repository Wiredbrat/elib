const asyncHandler = (responseHandler) => async (req, res, next) => {
  try {
    await responseHandler(req, res, next) 
  } catch (error) {
    console.log('connection failed', error) 
  }
}

export { asyncHandler }