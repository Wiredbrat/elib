import mongoose from "mongoose";

const connectDb = async() => {
  try {
    const dbConnection =  await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {autoIndex: false})
    console.log('Database Connected, DB HOST', dbConnection.connection.host)
  } catch (error) {
    console.log("Databse Connection Error", error)
      process.exit(1)
  }
}

export {connectDb}