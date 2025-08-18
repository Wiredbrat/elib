const userRoutes = {
  login: 'http://localhost:8000/api/v1/user/login',
  register: 'http://localhost:8000/api/v1/user/register',
  otp: 'http://localhost:8000/api/v1/auth/send-otp',
  verifyOtp: 'http://localhost:8000/api/v1/auth/verify-otp',
  getUserCollection: 'http://localhost:8000/api/v1/user/get-user/books',
  logout: 'http://localhost:8000/api/v1/user/logout',
  getUser: 'http://localhost:8000/api/v1/user/get-user',

}

export default userRoutes