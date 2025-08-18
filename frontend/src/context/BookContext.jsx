import { createContext, useState } from "react";

const BookContext = createContext()

const BookProvider = ({children}) => {
  const [bookData, setBookData] = useState(null)
  return (
    <BookContext.Provider value={{bookData, setBookData}}>
      {children}
    </BookContext.Provider>
  )
}

export { BookContext, BookProvider }