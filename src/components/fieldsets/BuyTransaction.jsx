import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import fetchBuyTransaction from '../../services/fetchBuyTransaction';
import ComponentLoading from '../spinners/ComponentLoading';


const BuyTransaction = ({selected}) => {

  const [transaction, setTransaction] = useState({
    transaction_type: 'buy',
    quantity: '0'
  })
  
  const [showError, setShowError] = useState(false)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const { userData } = useContext(DataContext)
  const user = userData?.data      
  const accounts = user?.accounts.reduce((account) => account)
  const account_id = 0
  
  const { mutate, error, data, isLoading, isFetching} = fetchBuyTransaction();
  
  const handleChange = (e) => {
    const {value} = e.target
    const numericValue = value.replace(/[^0-9]/g, '');

    setTransaction({...transaction, quantity: numericValue})
    setIsTyping(true)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
  
      if(transaction.quantity == 0 || transaction.quantity < 0 || selected.id === null){
        setShowError(true)
        setMessage('Invalid action')
      }else if(error){
        setTransaction({...transaction, quantity: '0'})
        setShowError(true)
        setMessage(error)
        
      }else if(!error){
          const stock_id = selected.id
          const formData = {
            transaction_type: transaction.transaction_type,
            quantity: transaction.quantity
          };
          
          mutate({account_id, stock_id, formData})
      
          setShowError(false)
          setIsTyping(false)
          setMessage(data?.message)
      }
    }catch(error){
      console.error(error)
    }
  }
  
  const handleBlur = () => {
    setShowError(null)
  }
  
  const renderMessage = () => {
    switch(showError){
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
      setShowError(null)
      setMessage('')
    }
  }, [isTyping])


  return (
    <div className='bg-white' onBlur={handleBlur}>
      <fieldset className='p-2 border-2 border-indigo-700'>
        <legend className='text-xs font-semibold text-indigo-700'>Buy Stock</legend>
          <div className='flex flex-row justify-between h-6 text-xs font-semibold'>
            <p className='text-indigo-700'>Quantity</p> 
            {isLoading || isFetching? <ComponentLoading /> :
            renderMessage()}
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