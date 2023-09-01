import React from 'react'
import pageSpinner from '../../assets/pageSpinner.gif'

const PageSpinner = () => {
  return (
    <img src={pageSpinner} alt='Loading...' height='50' width='50' className='bg-white'/>
  )
}

export default PageSpinner