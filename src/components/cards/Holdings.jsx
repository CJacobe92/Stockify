import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import SellModal from '../modals/SellModal'
import SellTransaction from './SellTransaction'
import PageLoading from '../spinners/PageLoading'

const Holdings = () => {
  const { state, userData, userIsLoading } = useContext(DataContext)

  const portfolios = userData && userData?.portfolios

  return (
    <div className='w-full'>
      <p className='pb-2 text-lg font-semibold text-white bg-gray-900'>Holdings</p>
      <div className='overflow-y-auto bg-white max-h-[72vh] min-h-[72vh] scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-indigo-500' >
        {userIsLoading ? (
          <div className='max-h-[72vh] min-h-[72vh] border border-black flex justify-center items-center'>
            <PageLoading /> 
          </div>)
           :
        <div className='flex items-center bg-white'>
          <table className='w-full h-full text-black bg-white'>
            <thead className='sticky top-0 text-white bg-indigo-900'>
              
              <tr className='w-full text-xs'>
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
            <tbody className='text-xs bg-white'>
            { portfolios && portfolios.flatMap((portfolio, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-indigo-200'} cursor-pointer hover:bg-indigo-500 hover:text-black`}>
                  <td className='p-1 font-semibold text-center'>{portfolio?.symbol}</td>
                  <td className='p-1 text-center'>{portfolio?.description?.slice(0, 30)}</td>
                  <td className='p-1 text-center'>{portfolio?.current_price}</td>
                  <td className='p-1 text-center'>{portfolio?.average_purchase_price?.slice(0, portfolio.average_purchase_price.indexOf('.') + 3)}</td>
                  <td className='p-1 text-center'>{portfolio?.total_quantity}</td>
                  <td className='p-1 text-center'>{portfolio?.total_value}</td>
                  {/* Extract up to 3 character after the index of . */}
                  <td className='p-1 text-center'>{portfolio?.total_gl?.slice(0, portfolio.total_gl.indexOf('.') + 3)}</td>
                  <td className='p-1 text-center'>
                    {portfolio ? (
                      <SellModal title={'Sell Stocks'}>
                        <SellTransaction portfolio={portfolio} />
                      </SellModal>
                    ) : null}
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  )
}
export default Holdings
