import {useContext} from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

function Card({key, imageUrl, bookName, bookId}) {
  const {theme} = useContext(ThemeContext)
  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity:1, y: 0, transition: {duration: 0.3}}}
      key={key} 
      className={`card rounded-md px-3 py-4 m-2 shadow-md`}
    >
      <Link to={`https://archive.org/details/${bookId}`}>
      <img 
        className='h-48 w-36 object-fill'
        src={imageUrl} 
        alt={bookName} 
        />
      </Link>
    </motion.div>
  )
}

export default Card