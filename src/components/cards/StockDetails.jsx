import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const StockDetails = () => {

  const {state} = useContext(GlobalContext)
  const selected = state && state.selected
  
  return (
    <fieldset className='px-2 m-2 text-gray-800 border border-indigo-900 rounded-sm'>
      <legend className='mx-1 text-sm font-semibold'>Stock Details</legend>
      <ol className='py-2 text-sm'>
        <li className='m-2'>
          <p className='text-xs font-semibold'>Company</p>
          <p className='text-sm' >{selected != null ?  selected.name : '< Company >'}</p>
        </li>
        <li className='m-2'>
          <p className='text-xs font-semibold'>Symbol</p>
          <p className='text-sm' >{selected != null ?  selected.symbol : '< Symbol >'}</p>
        </li>
        <li className='m-2'>
          <p className='text-xs font-semibold'>Change(%)</p>
          <p className='text-sm' >{selected != null ?  selected.percent_change : '< Change % >'}</p>
        </li>
        <li className='m-2'>
          <p className='text-xs font-semibold'>Price</p>
          <p className='text-sm' >{selected != null ?  selected.price : '< Price >'}</p>
        </li>
        <li className='m-2'>
          <p className='text-xs font-semibold'>Volume</p>
          <p className='text-sm' >{selected != null ?  selected.volume : '< Volume >'}</p>
        </li>
      </ol>
    </fieldset>
  )
}

export default StockDetails