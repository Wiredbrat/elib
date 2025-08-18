import { useParams } from "react-router-dom"
import Books from "./Books"

function ExploreBooks() {
  const { category } = useParams()
  return (
    <div className='absolute w-full md:w-[69%] lg:w-[79%] top-20 md:right-2 bottom-2 overflow-auto scrollbar-hide'>
      <div className={`grid grid-flow-row gap-4 h-auto`}>
        <Books category={category} buttonHidden={true} layout={'grid'} limit={20}/>
      </div>
    </div>
  )
}
export default ExploreBooks