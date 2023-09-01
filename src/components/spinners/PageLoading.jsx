import React from 'react'
import pagespinner from '../../assets/pagespinner.gif'

const PageLoading = () => {
  return (
    <img src={pagespinner} alt='Loading...' height='50' width='50' className='bg-white'/>
  )
}

export default PageLoading