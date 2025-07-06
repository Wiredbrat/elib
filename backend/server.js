import dotenv from 'dotenv'
import { connectDb } from './db/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT || 4000

connectDb()
.then(() => {

  app.on('error', () => {
    console.log('database connection failed', error)
  })
})
.then(() => {

  app.listen(PORT, () => {
    console.log('app is listening on: ', PORT)
  })
})
.catch((error) => {
  console.log('Connection Failed', error)
})
.finally(() => {
  console.log('database handled')
})


