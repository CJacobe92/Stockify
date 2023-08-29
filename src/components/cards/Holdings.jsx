import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import SellModal from '../modals/SellModal'
import SellTransaction from './SellTransaction'

const Holdings = () => {
  const { state } = useContext(GlobalContext)
  const portfolios = state.portfolios && state.portfolios

  return (
    <div className='w-full'>
      <p className='pb-2 font-semibold text-white bg-gray-900'>Holdings</p>
      <div className='overflow-y-auto bg-white max-h-52 min-h-52 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-indigo-500' >
        <div className='flex items-center bg-white'>
          <table className='w-full h-full text-black bg-white'>
            <thead className='sticky top-0 text-white bg-indigo-900'>
              <tr className='w-full text-sm'>
                <th className='w-10 p-2 text-center'>Symbol</th>
                <th className='w-10 p-2 text-center'>Description</th>
                <th className='w-10 p-2 text-center'>Current Price</th>
                <th className='w-10 p-2 text-center'>Purchase Price</th>
                <th className='w-10 p-2 text-center'>Quantity</th>
                <th className='w-10 p-2 text-center'>Total Value</th>
                <th className='w-10 p-2 text-center'>Total G/L</th>
                <th className='w-10 p-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {portfolios &&
                portfolios.flatMap((portfolio, index) => (
                  <tr key={index} className={`${index % 2 == 0 ? 'bg-slate-100' : 'bg-indigo-200'} cursor-pointer hover:bg-indigo-500 hover:text-black`} >
                    <td className='p-1 font-semibold text-center'>{portfolio != null ? portfolio.symbol : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.description.slice(0, 30) : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.current_price : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.avg_purchase_price : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.total_quantity : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.total_value : null }</td>
                    <td className='p-1 text-center'>{portfolio != null ? portfolio.total_gl : null}</td>
                    <td className='p-1 text-center'>
                      {portfolio != null ?
                        <SellModal title={'Sell Stocks'}>
                          <SellTransaction portfolio={portfolio}/>
                        </SellModal> : null
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Holdings
