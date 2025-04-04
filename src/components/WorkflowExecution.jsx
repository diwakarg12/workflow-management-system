import React from 'react'
import { useParams } from 'react-router-dom'

const WorkflowExecution = () => {
    const {id} = useParams();
  return (
    <div className='flex flex-col items-center justify-center bg-[#FFFAF2]'>
        <p>{id}</p>
    </div>
  )
}

export default WorkflowExecution