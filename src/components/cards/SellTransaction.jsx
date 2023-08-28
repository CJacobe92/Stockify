import React, { useContext, useState } from 'react'
import fetchSellTransaction from '../../services/fetchSellTransaction'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import useGetData from '../../hooks/useGetData'
import useRefetchData from '../../hooks/useRefetchData'

const SellTransaction = ({portfolio, onClose, open, stock_id, account_id}) => {

  if(!open) return null

  const { state } = useContext(GlobalContext)
  const {refetch, error, isLoading} = useRefetchData()
  
  const uid = state.uid
  const auth = state.auth
  
  const [transaction, setTransaction] = useState({quantity: '0'})
  
  console.log(account_id)
  const handleChange = (e) =>{
    const { value } = e.target
    setTransaction({...transaction, quantity: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await fetchSellTransaction(uid, auth, account_id, stock_id, transaction)
      refetch();
    } catch(error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='p-2 border border-black border-opacity-50 rounded-sm'>
        <legend className='mx-2 text-xs font-semibold text-gray-700'>Stock Information</legend>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-xs font-semibold text-gray-700'>Company: </p>
          <p className='mx-1 text-xs text-gray-600'>{portfolio != null ? portfolio.description : '[DESC]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-xs font-semibold text-gray-700'>Symbol:</p> 
          <p className='mx-1 text-xs text-gray-600'>{portfolio != null ? portfolio.symbol : '[SYMB]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-xs font-semibold text-gray-700'>Sell Price:</p> 
          <p className='mx-1 text-xs text-gray-600'>{portfolio != null ? portfolio.current_price : '[CURRENT]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-xs font-semibold text-gray-700'>Owned:</p> 
          <p className='mx-1 text-xs text-gray-600'>{portfolio != null ? portfolio.total_quantity : '[TOTAL_QTY]'}</p>
        </div>
      </fieldset>
      
      <fieldset className='p-2 border border-black border-opacity-50'>
        <legend className='mx-2 text-xs font-semibold text-gray-700'>Quantity</legend>
        <div className='flex flex-row w-full justify-evenly'>
          <input 
            type="text" 
            name="" 
            id="" 
            onChange={handleChange}
            className='w-full p-2 m-1 font-bold text-gray-700 border border-gray-700 rounded-sm outline-none border-opacity-70'/>
          <div className='flex flex-row items-center justify-center w-full'>
            <button type='submit' className='w-full p-2 m-1 text-white bg-indigo-900 rounded-sm'>Sell</button>
            <button className='w-full p-2 m-1 text-white bg-indigo-900 rounded-sm' onClick={onClose}>Cancel</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default SellTransaction