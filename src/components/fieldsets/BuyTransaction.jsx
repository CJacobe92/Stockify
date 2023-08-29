import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import StockSearch from './StockSearch'
import fetchBuyTransaction from '../../services/fetchBuyTransaction'
import useRefetchData from '../../hooks/useRefetchData'

const BuyTransaction = () => {

  const [transaction, setTransaction] = useState({quantity: '0'})
  
  const {state} = useContext(GlobalContext)
  const selected = state && state.selected
  const account_id = state.accounts && state.accounts.map((account) => (account.id))
  const uid = state.uid && state.uid
  const auth = state.auth && state.auth
  const {refetch, error, isLoading} = useRefetchData()
  
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
        await fetchBuyTransaction(uid, auth, account_id, selected.id, transaction)
        refetch()
      }
    }catch(error){
      
    }
  }
  
  return (
      <fieldset className='p-2 border-2 border-indigo-700'>
        <legend className='ml-2 text-xs font-semibold text-indigo-700'>Quantity</legend>
        <div className='flex flex-row items-center justify-between'>
          <input type="text" value={transaction.quantity} onChange={handleChange} className='p-2 font-semibold text-black bg-indigo-100 border-b-2 border-indigo-700 rounded-sm outline-none border-opacity-70'/>
          <button onClick={handleSubmit} className='p-2 ml-2 text-white bg-indigo-900' type='submit'>Order</button>
        </div>
      </fieldset>
  )
}

export default BuyTransaction