import React from 'react'
import pagespin from '../../assets/pagespinner.gif'

const PageLoading = () => {
  return (
    <img src={pagespin} alt='Loading...' height='50' width='50' className='bg-white'/>
  )
}

export default PageLoading