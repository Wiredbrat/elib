import { motion } from 'motion/react'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VscHeart, VscHeartFilled  } from "react-icons/vsc";
import { AuthContext } from '../context/AuthContext';
import { BookContext } from '../context/BookContext';
import axios from 'axios';
import { handleCardClick } from '../utils/handleCardClick';


function Card({imageUrl, bookName, bookId, workKey}) {
  const navigate = useNavigate()
  const [isFavorite, SetIsFavorite] = useState(false)
  const { authData } = useContext(AuthContext )
  const isLoggedIn = Boolean(authData && Object.keys(authData).length > 0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const {bookData, setBookData} = useContext(BookContext)
  const handleFavorite = () => {
    if(!isLoggedIn) {
      navigate('/login')
    }
    SetIsFavorite(prev => !prev)  
  } 

  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity:1, y: 0, transition: {duration: 0.3}}}
      key={workKey} 
      className={`card relative rounded-md px-3 py-4 m-2 shadow-md w-40`}
    > 
      <span 
        className={`${isFavorite ? 'isFavorite' : 'text-gray-200'} absolute cursor-pointer bottom-3 text-xl inline-block backdrop-blur-sm bg-[#5454541e] p-[6px] rounded-2xl`} 
        onClick={handleFavorite}
      >{isFavorite ? <VscHeartFilled /> : <VscHeart />}</span>
      <Link onClick={() => handleCardClick(bookId, workKey, imageUrl, setBookData)}>
      <img 
        className='h-48 w-36 object-fill'
        src={imageUrl} 
        alt={bookName} 
        loading='lazy'
        />
      </Link>
    </motion.div>
  )
}

export default Card