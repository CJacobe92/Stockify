import React from 'react'
import loading from '../../assets/loading.svg'

const FetchLoading = () => {
  return (
    <section className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-900'>
      <h1 className='m-2 text-4xl font-bold text-center text-indigo-500'>Stockify</h1>
      <img src={loading} alt='Loading...' style={{ width: '5rem', height: '5rem' }} className='bg-gray-900'/>
      <p className='m-2 text-xs font-semibold text-white'>"Trade. Thrive. Triumph."</p>
    </section>
  )
}

export default FetchLoading