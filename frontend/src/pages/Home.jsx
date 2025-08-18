import React, { useState } from 'react'
import { BookDetails, Searchbar, Sidebar } from '../Importer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [isSideBarTrue, setIsSideBarTrue] = useState(false)
  const navigate = useNavigate()
  const handleUser = () => {
    navigate('/user')
  }
  return (
    <>
      
      <Searchbar onClick={() => setIsSideBarTrue(prev => !prev)} handleUser={handleUser}/>
      <Sidebar isSidebarVisible={isSideBarTrue}/>
      <BookDetails/>
    </>
  )
}

export default Home