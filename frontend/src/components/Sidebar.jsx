import React, { useEffect, useState } from 'react'

function Sidebar({isSidebarVisible}) {

  return (
    <>
      <div className={`h-screen w-[80%] md:w-1/5 bg-white shadow-lg absolute top-0 ${isSidebarVisible? 'left-0' : 'left-[-80%]'} md:left-0 duration-200 ease-out`}>

      </div>
    </>
  )
}

export default Sidebar