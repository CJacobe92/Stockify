import React, { useContext, useState } from 'react'
import fetchSellTransaction from '../../services/fetchSellTransaction'
import { DataContext } from '../../providers/DataContextProvider'

const SellTransaction = ({portfolio}) => {
    
  const [transaction, setTransaction] = useState({
    transaction_type: 'sell',
    quantity: '0'
  })

  const {mutate, error} = fetchSellTransaction()
  const account_id = portfolio?.account_id
  const stock_id = portfolio?.stock_id
  
  const handleChange = (e) =>{
    const { value } = e.target
    setTransaction({...transaction, quantity: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = {
        transaction_type: transaction.transaction_type,
        quantity: transaction.quantity
      };
      
      mutate({account_id, stock_id, formData})
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='py-2'>
      <fieldset className='p-2 mb-2 border-2 border-indigo-700 rounded-sm'>
        <legend className='text-xs font-semibold text-indigo-700 text-start'>Stock Information</legend>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-sm font-semibold text-indigo-800 text-start'>Company: </p>
          <p className='mx-1 text-xs font-semibold text-gray-700'>{portfolio != null ? portfolio.description : '[DESC]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-sm font-semibold text-indigo-800 text-start'>Symbol:</p> 
          <p className='mx-1 text-xs font-semibold text-gray-700'>{portfolio != null ? portfolio.symbol : '[SYMB]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-sm font-semibold text-indigo-800 text-start'>Sell Price:</p> 
          <p className='mx-1 text-xs font-semibold text-gray-700'>{portfolio != null ? portfolio.current_price : '[CURRENT]'}</p>
        </div>
        <div className='flex flex-row'>
          <p className='w-20 mx-1 text-sm font-semibold text-indigo-800 text-start'>Owned:</p> 
          <p className='mx-1 text-xs font-semibold text-gray-700'>{portfolio != null ? portfolio.total_quantity : '[TOTAL_QTY]'}</p>
        </div>
      </fieldset>
      
      <fieldset className='p-2 border-2 border-indigo-700'>
        <legend className='text-xs font-semibold text-indigo-700 text-start'>Quantity</legend>
        <div className='h-6 text-red-700'>{error ? error : null}</div>
        <div className='flex flex-row w-full justify-evenly'>
          <input 
            type="text" 
            name="" 
            id="" 
            onChange={handleChange}
            className='w-full p-2 m-1 font-bold text-gray-700 bg-indigo-100 border-b-2 border-indigo-700 rounded-sm outline-none'/>
          
            <button type='submit' className='w-20 p-2 m-1 text-white bg-indigo-900 rounded-sm'>Sell</button>
        </div>
      </fieldset>
    </form>
  )
}

export default SellTransaction