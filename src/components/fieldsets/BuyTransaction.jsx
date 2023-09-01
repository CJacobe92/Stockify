import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import StockSearch from './StockSearch'
import fetchBuyTransaction from '../../services/fetchBuyTransaction'
import useAuth from '../../hooks/useAuth'

const BuyTransaction = () => {

  const [transaction, setTransaction] = useState({quantity: '0'})
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const { state, dispatch } = useContext(DataContext)
  const stock = state && state.stock
  const accounts = state.data && state.data.accounts && state.data.accounts
  const account = accounts && accounts.reduce((account) => (account))
  
  const {currentUser, token} = useAuth();
  
  const handleChange = (e) => {
    const {value} = e.target
    setTransaction({...transaction, quantity: value})
    setIsTyping(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
  
      if(transaction.quantity == 0 || transaction.quantity < 0 || stock.id === null){
        setError(true)
        setMessage('Invalid action')
      }else if(currentUser && token ){
        const data =  await fetchBuyTransaction(currentUser, token, account.id, stock.id, transaction)
        console.log(data)
        
        if(data.error){
          setError(true)
          setMessage(data.error)
        }else if(data.message){
          dispatch({type: 'REFETCH'})
          setSuccess(true)
          setError(false)
          setIsTyping(false)
          setMessage('Order successful')
        }
      }
    }catch(error){
      console.error()
    }
  }
  
  const handleBlur = () => {
    setError(null)
  }
  
  const renderMessage = () => {
    switch(error){
      case true: 
      return(
        <p className='text-red-700'>{message}</p>
      )
      case false:
        return(
          <p className='text-green-700'>{message}</p>
        )
    }
  }

  useEffect(() => {
    if(isTyping == true){
      setError(null)
      setMessage('')
    }
  }, [isTyping])
  
  return (
    <div className='bg-white' onBlur={handleBlur}>
      <fieldset className='p-2 border-2 border-indigo-700'>
        <legend className='text-xs font-semibold text-indigo-700'>Buy Stock</legend>
          <div className='flex flex-row justify-between h-6 text-xs font-semibold'>
            <p className='text-indigo-700'>Quantity</p> 
            {renderMessage()}
          </div>
          <input 
            type="text" 
            value={transaction.quantity} 
            onChange={handleChange} 
            className='w-full px-1 py-2 my-1 font-semibold text-black bg-indigo-100 border-b-2 border-indigo-700 rounded-sm outline-none border-opacity-70'/>
          <button onClick={handleSubmit} className='w-full p-1 mt-2 text-white bg-indigo-900' type='submit'>Order</button>
      </fieldset>
    </div>
  )
}

export default BuyTransaction