import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import StockSearch from '../search/StockSearch'
import fetchBuyTransaction from '../../services/fetchBuyTransaction'

const Transaction = () => {

  const [transaction, setTransaction] = useState({
    transaction_type: 'buy',
    quantity: '0'
  })
  
  const {state} = useContext(GlobalContext)
  const selected = state && state.selected
  const account_id = state.accounts && state.accounts.map((account) => (account.id))
  const uid = state.uid && state.uid
  const auth = state.auth && state.auth
  
  const handleChange = (e) => {
    const {value} = e.target
    setTransaction({...transaction, quantity: value})
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetchBuyTransaction(uid, auth, account_id, selected.id, transaction)
    }catch(error){
      
    }
  }
  
  return (
    <div className='w-full text-black bg-gray-100'>
      <form onSubmit={handleSubmit}>
        <fieldset className='m-2 border border-black'>
          <legend className='mx-2 text-sm font-semibold'>Buy Stock</legend>
          <div className='m-2'>
            <p className='text-sm font-semibold'>Quantity</p>
            <input type="text" value={transaction.quantity} onChange={handleChange} className='w-full p-1 my-2 border border-black border-opacity-50 rounded-md outline-none'/>
          </div>
          <div className='flex flex-row justify-between w-full p-2'>
          <button className='p-2 text-white bg-indigo-900 submit'>Reset</button>
            <button className='p-2 text-white bg-indigo-900' type='submit'>Order</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Transaction