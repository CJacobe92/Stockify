import React from 'react'
import reload from '../../assets/reload.gif'

const ComponentLoading = () => {
  return (
    <div className='w-auto h-auto'>
      <img src={reload} alt='Loading...' height='15' width='15' className='bg-white'/>
    </div>
    
  )
}

export default ComponentLoading