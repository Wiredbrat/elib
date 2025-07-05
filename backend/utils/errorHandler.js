class ApiError extends Error {
  constructor(
    statusCode, 
    message = 'something went wrong',
    errors = [],
    stack
  ) {
    super(statusCode)
    this.statusCode = statusCode
    this.message = message
    this.data = null
    this.success = false
    this.errors = errors
    stack ? this.stack = stack : Error.captureStackTrace(this, this.stack)
  }
}

export default ApiError