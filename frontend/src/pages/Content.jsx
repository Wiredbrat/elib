import React from 'react'
import { Books } from '../Importer'

function Content() {
  return (
    <div className='absolute w-full md:w-[79%] top-20 right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto `}>
        <Books category={'popular'}/>
        <Books category={'english'}/>
        <Books category={'recommended'}/>
      </div>
    </div>
  )
}

export default Content