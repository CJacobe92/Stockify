import React from 'react'
import reload from '../../assets/reload.svg'

const ComponentLoading = () => {
  return (
    <div className='flex items-center justify-center w-auto h-auto'>
      <img src={reload} alt='Loading...' height='15' width='15' className='bg-white'/>
    </div>
    
  )
}

export default ComponentLoading