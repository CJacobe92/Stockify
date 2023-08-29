import React from 'react'

const StockDetails = ({selected}) => {


  return (
    <fieldset className='p-2 mb-2 text-gray-800 border-2 border-indigo-700'>
        <legend className='mb-2 ml-2 text-xs font-semibold text-indigo-700'>Stock </legend>
        <ol className='text-sm'>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Company</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.name.slice(0, 50) : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Symbol</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.symbol : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Change(%)</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.percent_change : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Price</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.price : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Volume</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.volume : '[empty]'}</p>
          </li>
        </ol>
        
      </fieldset>
  )
}

export default StockDetails