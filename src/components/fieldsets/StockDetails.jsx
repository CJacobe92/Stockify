import React, { useContext } from 'react'

const StockDetails = ({selected}) => {

  return (
    <fieldset className='p-2 mb-2 text-gray-800 border-2 border-indigo-700'>
        <legend className='mb-2 ml-2 text-xs font-semibold text-indigo-700'>Stock </legend>
        <ol className='text-sm'>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Company</p>
            <p className='my-1 text-xs' >{selected && selected != null ?  selected.name.slice(0, 50) : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Symbol</p>
            <p className='my-1 text-xs' >{selected != null ?  selected.symbol : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Change(%)</p>
            <p className='my-1 text-xs' >{selected != null ?  selected.percent_change : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Price</p>
            <p className='my-1 text-xs' >{selected != null ?  selected.price : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Volume</p>
            <p className='my-1 text-sm' >{selected != null ?  selected.volume : '[empty]'}</p>
          </li>
        </ol>
        
      </fieldset>
  )
}

export default StockDetails