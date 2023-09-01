import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import StockSearch from './StockSearch'
import fetchBuyTransaction from '../../services/fetchBuyTransaction'
import useAuth from '../../hooks/useAuth'

const BuyTransaction = () => {

  const [transaction, setTransaction] = useState({quantity: '0'})
  
  const { state, dispatch } = useContext(DataContext)
  const stock = state && state.stock
  const account = state.data && state.data.accounts[0]
  
  const {currentUser, token} = useAuth();
  
  
  const handleChange = (e) => {
    const {value} = e.target
    setTransaction({...transaction, quantity: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(transaction.quantity == 0 || transaction.quantity < 0){
        console.error('Invalid quantity')
      }else {
        await fetchBuyTransaction(currentUser, token, account.id, stock.id, transaction)
        dispatch({type: 'REFETCH'})
      }
    }catch(error){
      
    }
  }
  
  return (
    <div className='bg-white'>
      <fieldset className='p-2 border-2 border-indigo-700'>
        <legend className='text-xs font-semibold text-indigo-700'>Quantity</legend>
          <input 
            type="text" 
            value={transaction.quantity} 
            onChange={handleChange} 
            className='w-full py-2 my-1 text-black bg-indigo-100 border-b-2 border-indigo-700 rounded-sm outline-none py-2font-semibold border-opacity-70'/>
          <button onClick={handleSubmit} className='w-full p-1 mt-1 text-white bg-indigo-900' type='submit'>Order</button>
      </fieldset>
    </div>
  )
}

export default BuyTransaction