import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='text-xl flex font-medium  items-center px-4'>
        <span>Loading</span> <Loader className="animate-spin"/>
    </div>
  )
}

export default Loading