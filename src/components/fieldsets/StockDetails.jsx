import React, { useContext } from 'react'
import { DataContext } from '../../providers/DataContextProvider'

const StockDetails = () => {

  const { state } = useContext(DataContext)
  
  const stock = state && state.stock

  return (
    
    <fieldset className='p-2 mb-2 text-gray-800 border-2 border-indigo-700'>
        <legend className='mb-2 ml-2 text-xs font-semibold text-indigo-700'>Stock </legend>
        <ol className='text-sm'>
          <li className='m-2'>
            <p className='text-sm font-semibold'>Company</p>
            <p className='my-1 text-xs' >{stock && stock != null ?  stock.name.slice(0, 50) : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Symbol</p>
            <p className='my-1 text-xs' >{stock != null ?  stock.symbol : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Change(%)</p>
            <p className='my-1 text-xs' >{stock != null ?  stock.percent_change : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Price</p>
            <p className='my-1 text-xs' >{stock != null ?  stock.price : '[empty]'}</p>
          </li>
          <li className='m-2'>
            <p className='text-xs font-semibold'>Volume</p>
            <p className='my-1 text-sm' >{stock != null ?  stock.volume : '[empty]'}</p>
          </li>
        </ol>
        
      </fieldset>
  )
}

export default StockDetails