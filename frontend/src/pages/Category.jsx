import React from 'react'
import { Books } from '../Importer'

function Category() {
  return (
    <div className='absolute w-full md:w-[69%] lg:w-[79%] top-20 md:right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto `}>
        <Books category={'thriller'}/>
        <Books category={'romance'}/>
        <Books category={'manga'}/>
        <Books category={'hot'}/>
        <Books category={'fantasy'}/>
      </div>
    </div>
  )
}

export default Category