import React, { useContext } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'

const Holdings = () => {
  const { state } = useContext(GlobalContext)
  const portfolios = state.portfolios && state.portfolios
  console.log(portfolios)

  
  return (
    <div className='w-full p-2 m-2 text-black bg-white'>
      <fieldset className='border border-black'>
        <legend className='mx-2'>Holdings</legend>
        {portfolios && portfolios.flatMap((portfolio) => (
          <div className='flex flex-row w-full'>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Symbol</p>
              <p className='m-1 text-left'>{portfolio.symbol}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Description</p>
              <p className='w-full m-1 text-left'>{portfolio.description.slice(0, 15)}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Current Price</p>
              <p className='m-1 text-left'>{portfolio.current_price}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Percent Change</p>
              <p className='m-1 text-left'>{portfolio.percent_change}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Avg Purchase Price</p>
              <p className='m-1 text-left'>{portfolio.avg_purchase_price}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Total Quantity</p>
              <p className='m-1 text-left'>{portfolio.total_quantity}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Total Value</p>
              <p className='m-1 text-left'>{portfolio.total_value}</p>
            </div>
            <div className='w-full m-2'>
              <p className='text-xs font-semibold'>Total G/L</p>
              <p className='m-1 text-left'>{portfolio.total_gl}</p>
            </div>
            <div className='w-full m-2'>
              <button className='px-4 py-2 text-white bg-indigo-900'>Sell</button>
            </div>
            
          </div>
        ))}
        
      </fieldset>
    </div>
  )
}
export default Holdings
