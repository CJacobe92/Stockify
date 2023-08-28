import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import SellModal from '../modals/SellModal'
import SellTransaction from './SellTransaction'

const Holdings = () => {
  const { state } = useContext(GlobalContext)
  const portfolios = state.portfolios && state.portfolios
  
  const selected = state && state.selected
  const account_id = state.accounts && state.accounts.map((account) => (account.id))
  const uid = state.uid && state.uid
  const auth = state.auth && state.auth
  
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full'>
      <p className='mb-2 font-semibold text-white'>Holdings</p>
      <div className='h-40 overflow-y-auto'>
        <table className='relative w-full text-black bg-white border border-black rounded-sm'>
          <thead className='sticky top-0 bg-gray-200'>
            <tr className='w-full text-sm'>
              <th className='w-10 py-2 text-center'>Symbol</th>
              <th className='w-10 py-2 text-center'>Description</th>
              <th className='w-10 py-2 text-center'>Current Price</th>
              <th className='w-10 py-2 text-center'>Purchase Price</th>
              <th className='w-10 py-2 text-center'>Quantity</th>
              <th className='w-10 py-2 text-center'>Total Value</th>
              <th className='w-10 py-2 text-center'>Total G/L</th>
              <th className='w-10 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='bg-white '>
            {portfolios &&
              portfolios.map((portfolio, index) => (
                <tr key={index} className='hover:bg-indigo-900 hover:text-white' >
                  <td className='p-1 font-semibold text-center'>{portfolio != null ? portfolio.symbol : '[SYMB]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.description.slice(0, 20) : '[DESC]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.current_price : '[CURRENT]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.avg_purchase_price : '[AVG_PURCHASE]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.total_quantity : '[TOTAL_QTY]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.total_value : '[TOTAL_VAL]'}</td>
                  <td className='p-1 text-center'>{portfolio != null ? portfolio.total_gl : '[TOTAL_GL]'}</td>
                  <td className='p-1 text-center'>
                    <button onClick={(e)=> setOpen(true)} className='w-full p-1 text-white bg-indigo-500 rounded-sm'>Sell</button>
                    <SellModal open={open} onClose={() => setOpen(false)} title={'Sell Stocks'} >
                      <SellTransaction portfolio={portfolio} open={open} onClose={() => setOpen(false)} stock_id={portfolio.stock_id} account_id={portfolio.stock_id}/>
                    </SellModal>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Holdings
