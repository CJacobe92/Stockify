import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import StockSearch from '../search/StockSearch'
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
      await fetchBuyTransaction(uid, auth, account_id, selected.id, transaction)
      refetch()
    }catch(error){
      
    }
  }
  
  return (
    <div className='p-2 text-black bg-gray-100'>
      <form onSubmit={handleSubmit} >
        <fieldset className='p-2 border border-black'>
          <legend className='text-sm font-semibold '>Buy Stock</legend>
          <div className='w-full'>
            <p className='text-sm font-semibold '>Quantity</p>
            <div className='m-1'>
              <input type="text" value={transaction.quantity} onChange={handleChange} className='w-full p-1 font-semibold border border-black border-opacity-50 rounded-sm outline-none'/>
            </div>
           
            <div className='flex flex-row justify-between w-full'>
              <button className='w-full p-1 m-1 text-white bg-indigo-900' type='submit'>Order</button>
              <button className='w-full p-1 m-1 text-white bg-indigo-900'>Reset</button>
              
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default BuyTransaction