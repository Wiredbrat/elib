import React, { useState } from 'react'
import { Searchbar, Sidebar } from '../Importer'

function Home() {
  const [isTrue, setIsTrue] = useState(false)
  return (
    <>
      <Searchbar onClick={() => setIsTrue(prev => !prev)}/>
      <Sidebar isSidebarVisible={isTrue}/>
    </>
  )
}

export default Home